import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import shakeHero from "@/assets/shake-hero.jpg";
import customShake from "@/assets/custom-shake.jpg";

const HomePage = () => {
  const { user } = useUser();

  return (
    <div className="px-4 pb-24 pt-6 animate-fade-in">
      <div className="mb-6">
        <p className="text-muted-foreground text-sm">Good to see you 👋</p>
        <h1 className="text-2xl font-bold">{user?.name || "Shake Lover"}</h1>
      </div>

      <div className="space-y-4">
        <Link to="/menu" className="block">
          <div className="relative rounded-2xl overflow-hidden h-44 group">
            <img src={shakeHero} alt="Explore menu" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/20 text-primary mb-2 inline-block">Popular</span>
              <h2 className="text-xl font-bold">Explore Menu</h2>
              <p className="text-muted-foreground text-sm">Discover our delicious shakes</p>
            </div>
          </div>
        </Link>

        <Link to="/builder" className="block">
          <div className="relative rounded-2xl overflow-hidden h-44 group">
            <img src={customShake} alt="Custom shake builder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/20 text-accent mb-2 inline-block">Create</span>
              <h2 className="text-xl font-bold">Build Your Shake</h2>
              <p className="text-muted-foreground text-sm">Mix your own perfect blend</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Quick Picks 🔥</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {["🥭 Mango", "🍫 Chocolate", "🍓 Strawberry", "🍪 Oreo", "🫐 Blueberry"].map((item) => (
            <Link
              key={item}
              to="/menu"
              className="flex-shrink-0 px-4 py-2.5 rounded-full glass-card text-sm font-medium hover:border-primary/50 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
