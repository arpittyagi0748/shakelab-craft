import { useState } from "react";
import { menuItems, categories } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const { addItem } = useCart();

  const filtered = menuItems.filter((i) => i.category === activeCategory);

  const handleAdd = (item: typeof menuItems[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="px-4 pb-24 pt-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Menu 🍹</h1>

      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "gradient-primary text-primary-foreground"
                : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="glass-card p-4 flex items-center gap-4 animate-slide-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
          >
            <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-muted">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              <p className="text-primary font-bold text-sm mt-0.5">₹{item.price}</p>
            </div>
            <button
              onClick={() => handleAdd(item)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Add +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
