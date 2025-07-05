import { useEffect, useState, useCallback } from "react";
import type { Celebrity, Product } from "../../data/types";
import { ProductCard } from "./ProductCard";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

type Props = {
  celebrity: Celebrity;
  onBack: () => void;
};

const PAGE_SIZE = 15;

export const ShoppingPage = ({ celebrity, onBack }: Props) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [, setPage] = useState(1);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setVisibleProducts(data.slice(0, PAGE_SIZE));
      });
  }, []);

  const loadMore = useCallback(() => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      const nextProducts = allProducts.slice(0, nextPage * PAGE_SIZE);
      setVisibleProducts(nextProducts);
      return nextPage;
    });
  }, [allProducts]);

  useInfiniteScroll(loadMore);

  const totalSpent = visibleProducts.reduce((acc, product) => {
    const qty = quantities[product.id] || 0;
    return acc + qty * product.price;
  }, 0);
  const purchasedStats = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = allProducts.find((p) => p.id === Number(id));
      return {
        name: product?.name || "Bilinmeyen Ürün",
        quantity: qty,
        total: product ? qty * product.price : 0,
      };
    });

  const remaining = celebrity.wealth - totalSpent;
  const percentageSpent = (totalSpent / celebrity.wealth) * 100;

  const increase = (id: number) => {
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    const currentQty = quantities[id] || 0;
    const newTotal = totalSpent + product.price;

    if (newTotal > celebrity.wealth) return alert('yetersiz bakieye');

    setQuantities((prev) => ({ ...prev, [id]: currentQty + 1 }));
  };

  const decrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="p-4 text-white">
      <button
        onClick={onBack}
        className="bg-secondary/90 py-2 px-6 rounded-2xl font-semibold"
      >
        ← Geri Dön
      </button>
      <div className="py-4">
        <div className="flex items-center justify-center flex-col lg:flex-row">
        <div className="flex flex-col mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {celebrity.name}'ın Parasını Harca
          </h1>
          <h2 className="text-xl text-center text-green-400 mb-4">
            Kalan: ${remaining.toLocaleString()} ({percentageSpent.toFixed(4)}%
            harcandı)
          </h2>
        </div>

          {purchasedStats.length > 0 && (
            <div className="mt-12 bg-muted/30 p-6 rounded-xl w-full max-w-2xl mx-auto shadow-xl h-50 overflow-y-scroll">
              <h3 className="text-2xl font-semibold mb-4 text-center text-white ">
                📊 Satın Alım İstatistikleri
              </h3>
              <ul className="space-y-2 text-white text-sm">
                {purchasedStats.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-muted pb-1"
                  >
                    <span className="font-medium">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-green-400">
                      ${item.total.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center font-bold text-lg text-green-300">
                Toplam Harcama: ${totalSpent.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-10 justify-center">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 0}
            onIncrease={() => increase(product.id)}
            onDecrease={() => decrease(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
