import type { Product } from "../../data/types";

type Props = {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const ProductCard = ({ product, quantity, onIncrease, onDecrease }: Props) => {
  return (
    <div className="bg-background border-2 border-zinc-500/20 rounded-2xl shadow-md p-4 flex flex-col items-center gap-2 w-[240px]">
      <img src={product.image} className="h-32 object-contain" alt={product.name} />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-muted-foreground">${product.price.toLocaleString()}</p>
      <div className="flex items-center gap-2 mt-2">
        <button onClick={onDecrease} className="bg-red-500 text-white px-2 rounded">-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease} className="bg-green-500 text-white px-2 rounded">+</button>
      </div>
    </div>
  );
};
