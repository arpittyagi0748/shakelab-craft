import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24 animate-fade-in">
        <p className="text-5xl mb-4">🥤</p>
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground text-sm mb-6">Add some shakes to get started!</p>
        <Link to="/menu" className="px-6 py-3 rounded-xl font-semibold gradient-primary text-primary-foreground">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 pt-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Cart 🛒</h1>

      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="glass-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                {item.details && <p className="text-xs text-muted-foreground mt-0.5">{item.details}</p>}
                <p className="text-primary font-bold text-sm mt-1">₹{item.price * item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive text-xs">
                ✕
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold hover:bg-muted/80"
              >
                −
              </button>
              <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="glass-card p-4 mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="border-t border-border my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-gradient">₹{totalPrice}</span>
        </div>
      </div>

      <button
        onClick={() => setShowCheckout(true)}
        className="w-full py-3.5 rounded-xl font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity text-lg"
      >
        Pay Now 💳
      </button>

      {/* Checkout modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="glass-card p-6 max-w-sm w-full text-center">
            <p className="text-4xl mb-4">🚧</p>
            <h2 className="text-lg font-bold mb-2">Coming Soon!</h2>
            <p className="text-muted-foreground text-sm mb-5">
              Payment integration coming soon. This is a demo version.
            </p>
            <button
              onClick={() => setShowCheckout(false)}
              className="px-6 py-2.5 rounded-xl font-semibold gradient-primary text-primary-foreground"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
