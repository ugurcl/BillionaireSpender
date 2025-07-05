import { useState } from "react";
import type { Celebrity } from "./data/types";
import { CelebrityMenu } from "./components/partials/CelebrityMenu";
import { ShoppingPage } from "./components/partials/ShoppingPage";

function App() {
  const [selected, setSelected] = useState<Celebrity | null>(null);

  return selected ? (
    <ShoppingPage celebrity={selected} onBack={() => setSelected(null)} />
  ) : (
    <CelebrityMenu onSelect={setSelected} />
  );
}

export default App;
