import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import OrderModal, { MenuItem } from "@/components/OrderModal";
import { supabase } from "@/lib/supabase";

// ── Type ──────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  category: "Food" | "Rentals";
  available: boolean;
}

const Shop = () => {
  const [products, setProducts]       = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading products:", error.message);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const food    = products.filter(p => p.category === "Food");
  const rentals = products.filter(p => p.category === "Rentals");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container py-16 text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">The Shop</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Food & rentals</h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Browse our packages and rentals. Tap "Order Now" to chat with us instantly on WhatsApp.
        </p>
      </section>

      {/* Loading skeleton */}
      {loading && (
        <section className="container pb-16">
          <div className="h-8 w-24 bg-muted rounded animate-pulse mb-8"/>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-card rounded-3xl overflow-hidden border border-border animate-pulse">
                <div className="w-full aspect-square bg-muted"/>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"/>
                  <div className="h-3 bg-muted rounded w-full"/>
                  <div className="h-3 bg-muted rounded w-1/2"/>
                  <div className="h-10 bg-muted rounded-full mt-4"/>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Food section */}
      {!loading && food.length > 0 && (
        <section className="container pb-16">
          <h2 className="font-display text-3xl mb-8">Food</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {food.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onOrder={() => setSelectedItem({
                  name: p.name,
                  price: p.price,
                  description: p.description,
                  category: p.category,
                })}
              />
            ))}
          </div>
        </section>
      )}

      {/* Rentals section */}
      {!loading && rentals.length > 0 && (
        <section className="container pb-16">
          <h2 className="font-display text-3xl mb-8">Rentals</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentals.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onOrder={() => setSelectedItem({
                  name: p.name,
                  price: p.price,
                  description: p.description,
                  category: p.category,
                })}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <section className="container pb-16 text-center">
          <p className="text-muted-foreground">No products available yet. Check back soon!</p>
        </section>
      )}

      <Footer />

      <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

// ── Product card ──────────────────────────────────────────────────────────
function ProductCard({ product: p, onOrder }: { product: Product; onOrder: () => void }) {
  return (
    <article className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
      {p.image_url
        ? <img src={p.image_url} alt={p.name} className="w-full aspect-square object-cover"/>
        : <div className="w-full aspect-square bg-muted flex items-center justify-center text-6xl">
            {p.category === "Food" ? "🍽️" : "🪑"}
          </div>
      }
      <div className="p-6">
        <h3 className="font-display text-xl mb-1">{p.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
        {p.price && <p className="text-primary font-semibold mb-4">{p.price}</p>}
        <Button
          className="w-full rounded-full bg-foreground text-background hover:bg-primary"
          onClick={onOrder}
        >
          Order Now
        </Button>
      </div>
    </article>
  );
}

export default Shop;