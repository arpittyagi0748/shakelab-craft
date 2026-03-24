import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const tabs = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/menu", label: "Menu", icon: "📋" },
  { path: "/builder", label: "Create", icon: "🧪" },
  { path: "/cart", label: "Cart", icon: "🛒" },
];

const BottomNav = () => {
  const { pathname } = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-t border-border">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-all relative ${
                active ? "text-primary scale-110" : "text-muted-foreground"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {tab.path === "/cart" && totalItems > 0 && (
                <span className="absolute -top-1 right-0 w-4 h-4 rounded-full gradient-primary text-[9px] font-bold flex items-center justify-center text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
