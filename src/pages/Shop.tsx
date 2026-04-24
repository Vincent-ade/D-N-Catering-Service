import Navbar, { WHATSAPP_URL } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import jollof from "@/assets/jollof.jpg";
import smallChops from "@/assets/small-chops.jpg";
import buffet from "@/assets/buffet.jpg";
import chairs from "@/assets/chairs.jpg";
import plates from "@/assets/plates.jpg";
import cooler from "@/assets/cooler.jpg";

type Product = {
  name: string;
  desc: string;
  price?: string;
  image: string;
  category: "Food" | "Rentals";
};

const products: Product[] = [
  { name: "Party Jollof Rice", desc: "Smoky, perfectly seasoned — serves up to 50 guests.", price: "₦45,000", image: jollof, category: "Food" },
  { name: "Small Chops Platter", desc: "Puff-puff, samosa, spring rolls & gizzard skewers.", price: "₦25,000", image: smallChops, category: "Food" },
  { name: "Full Catering Package", desc: "Complete buffet spread for 100 guests.", price: "₦350,000", image: buffet, category: "Food" },
  { name: "Gold Chiavari Chairs", desc: "Elegant gold event chairs — per piece.", price: "₦1,500", image: chairs, category: "Rentals" },
  { name: "Gold-Rim Dinner Plates", desc: "Premium porcelain plate set — per piece.", price: "₦500", image: plates, category: "Rentals" },
  { name: "Beverage Cooler", desc: "Stainless steel dispenser, 50L capacity.", price: "₦8,000", image: cooler, category: "Rentals" },
];

const orderUrl = (name: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi Savoria, I want to order ${name}.`)}`;

const Shop = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="container py-16 text-center">
      <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">The Shop</span>
      <h1 className="font-display text-5xl md:text-6xl mt-3">Food & rentals</h1>
      <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
        Browse our packages and rentals. Tap "Order Now" to chat with us instantly on WhatsApp.
      </p>
    </section>

    {(["Food", "Rentals"] as const).map((cat) => (
      <section key={cat} className="container pb-16">
        <h2 className="font-display text-3xl mb-8">{cat}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.filter((p) => p.category === cat).map((p) => (
            <article key={p.name} className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all hover:-translate-y-1">
              <img src={p.image} alt={p.name} width={1024} height={1024} loading="lazy" className="w-full aspect-square object-cover"/>
              <div className="p-6">
                <h3 className="font-display text-xl mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                {p.price && <p className="text-primary font-semibold mb-4">{p.price}</p>}
                <Button asChild className="w-full rounded-full bg-foreground text-background hover:bg-primary">
                  <a href={orderUrl(p.name)} target="_blank" rel="noreferrer">Order Now</a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    ))}

    <Footer />
  </div>
);

export default Shop;
