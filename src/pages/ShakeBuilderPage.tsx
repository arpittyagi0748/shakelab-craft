import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface AddOn {
  name: string;
  emoji: string;
  volume: number;
  price: number;
  active: boolean;
}

const MAX_VOLUME = 300;

const ShakeBuilderPage = () => {
  const { addItem } = useCart();
  const [milk, setMilk] = useState(150);
  const [sugar, setSugar] = useState(20);
  const [addOns, setAddOns] = useState<AddOn[]>([
    { name: "Protein Scoop", emoji: "💪", volume: 30, price: 40, active: false },
    { name: "KitKat", emoji: "🍫", volume: 20, price: 30, active: false },
    { name: "Dry Fruits", emoji: "🥜", volume: 15, price: 35, active: false },
    { name: "Mango", emoji: "🥭", volume: 25, price: 25, active: false },
    { name: "Strawberry", emoji: "🍓", volume: 25, price: 25, active: false },
    { name: "Chocolate Syrup", emoji: "🍯", volume: 15, price: 20, active: false },
  ]);

  const addOnVolume = addOns.filter((a) => a.active).reduce((s, a) => s + a.volume, 0);
  const totalVolume = milk + sugar + addOnVolume;
  const remaining = MAX_VOLUME - totalVolume;
  const fillPercent = Math.min(100, (totalVolume / MAX_VOLUME) * 100);

  const price = useMemo(() => {
    const base = 49;
    const milkCost = Math.round(milk * 0.3);
    const addOnCost = addOns.filter((a) => a.active).reduce((s, a) => s + a.price, 0);
    return base + milkCost + addOnCost;
  }, [milk, addOns]);

  const toggleAddOn = (index: number) => {
    setAddOns((prev) => {
      const a = prev[index];
      if (!a.active && a.volume > remaining) {
        toast.error("Not enough room in your glass!");
        return prev;
      }
      return prev.map((item, i) => (i === index ? { ...item, active: !item.active } : item));
    });
  };

  const handleAddToCart = () => {
    const activeAddOns = addOns.filter((a) => a.active).map((a) => a.name);
    const details = `Milk: ${milk}ml, Sugar: ${sugar}ml${activeAddOns.length ? ", " + activeAddOns.join(", ") : ""}`;
    addItem({
      id: `custom-${Date.now()}`,
      name: "Custom Shake",
      price,
      isCustom: true,
      details,
    });
    toast.success("Custom shake added to cart! 🎉");
  };

  return (
    <div className="px-4 pb-24 pt-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-1">Shake Builder 🧪</h1>
      <p className="text-muted-foreground text-sm mb-5">Craft your perfect 300ml shake</p>

      {/* Glass visualization */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-48 rounded-b-3xl rounded-t-lg border-2 border-border overflow-hidden bg-muted/30">
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out rounded-b-2xl"
            style={{
              height: `${fillPercent}%`,
              background: `linear-gradient(to top, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold drop-shadow-lg">{totalVolume}ml</span>
          </div>
        </div>
      </div>

      {/* Volume bar */}
      <div className="glass-card p-3 mb-5">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Volume used</span>
          <span>{totalVolume}/{MAX_VOLUME}ml</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 gradient-primary"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-6">
        <div className="glass-card p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">🥛 Milk</span>
            <span className="text-primary font-semibold">{milk}ml</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.min(200, 200 - Math.max(0, totalVolume - milk - remaining))}
            value={milk}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val + sugar + addOnVolume <= MAX_VOLUME) setMilk(val);
            }}
            className="w-full accent-primary"
          />
        </div>
        <div className="glass-card p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">🍬 Sugar</span>
            <span className="text-secondary font-semibold">{sugar}ml</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={sugar}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (milk + val + addOnVolume <= MAX_VOLUME) setSugar(val);
            }}
            className="w-full accent-secondary"
          />
        </div>
      </div>

      {/* Add-ons */}
      <h3 className="font-semibold mb-3">Add-ons</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {addOns.map((a, i) => (
          <button
            key={a.name}
            onClick={() => toggleAddOn(i)}
            className={`p-3 rounded-xl text-left transition-all ${
              a.active
                ? "bg-primary/20 border border-primary/50"
                : "glass-card hover:border-primary/30"
            }`}
          >
            <div className="text-lg mb-1">{a.emoji}</div>
            <div className="text-xs font-medium">{a.name}</div>
            <div className="text-xs text-muted-foreground">{a.volume}ml · ₹{a.price}</div>
          </button>
        ))}
      </div>

      {/* Price + CTA */}
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Estimated Price</p>
          <p className="text-2xl font-bold text-gradient">₹{price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={totalVolume === 0}
          className="px-6 py-3 rounded-xl font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ShakeBuilderPage;
