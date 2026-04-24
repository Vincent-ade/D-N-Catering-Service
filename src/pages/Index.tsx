import { Link } from "react-router-dom";
import { ArrowRight, ChefHat, Sparkles, Armchair, Star } from "lucide-react";
import Navbar, { WHATSAPP_URL } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";
import eventSetup from "@/assets/event-setup.jpg";
import jollof from "@/assets/jollof.jpg";
import smallChops from "@/assets/small-chops.jpg";
import buffet from "@/assets/buffet.jpg";

const services = [
  { icon: ChefHat, title: "Catering", desc: "From intimate gatherings to large weddings — bold, authentic Nigerian flavors." },
  { icon: Sparkles, title: "Event Planning", desc: "Thoughtful, end-to-end planning for celebrations that feel effortless." },
  { icon: Armchair, title: "Rentals", desc: "Chairs, tableware, coolers, and serving equipment for every occasion." },
];

const testimonials = [
  { name: "Adaeze O.", text: "D & N handled our wedding catering flawlessly. The jollof was unmatched!" },
  { name: "Tunde A.", text: "Professional, warm, and impeccably organized. Booking again." },
  { name: "Chiamaka E.", text: "The small chops platter was the talk of the party. Pure excellence." },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="container grid lg:grid-cols-2 gap-12 items-center pt-12 pb-20 lg:pt-20">
      <div className="animate-slide-in-left" style={{ animationDuration: "0.8s" }}>
        <span className="inline-block text-xs tracking-[0.2em] uppercase text-primary font-medium mb-5 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Catering · Events · Rentals
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Delicious catering & <em className="text-primary not-italic">elegant</em> event services.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "0.4s" }}>
          A family-owned kitchen serving unforgettable food and curated event experiences across Nigeria.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Shop Today <ArrowRight className="ml-2" size={18}/>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/20 transition-transform hover:scale-105">
            <Link to="/shop">Browse Menu</Link>
          </Button>
        </div>
      </div>
      <div className="relative animate-slide-in-right" style={{ animationDuration: "0.8s" }}>
        <img
          src={heroFood}
          alt="Plated jollof rice with grilled chicken on terracotta"
          width={1536}
          height={1024}
          className="rounded-[2rem] shadow-2xl object-cover w-full aspect-[4/3] transition-transform hover:scale-[1.02]"
        />
        <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-xl border border-border max-w-[200px] animate-bounce-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex gap-1 text-primary mb-1">
            {[...Array(5)].map((_,i)=><Star key={i} size={14} fill="currentColor"/>)}
          </div>
          <p className="text-xs text-muted-foreground">Trusted by 500+ events nationwide.</p>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="container py-20">
      <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
        <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">What we do</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3">Featured services</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, index) => (
          <div 
            key={s.title} 
            className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-scale-in" 
            style={{ animationDelay: `${0.1 + index * 0.15}s` }}
          >
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
              <s.icon className="text-primary" size={22}/>
            </div>
            <h3 className="font-display text-2xl mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Why choose us */}
    <section className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
      <img 
        src={eventSetup} 
        alt="Elegant outdoor reception table" 
        width={1280} 
        height={896} 
        loading="lazy" 
        className="rounded-[2rem] object-cover w-full aspect-[4/3] shadow-xl animate-slide-in-left transition-transform hover:scale-[1.02]"
        style={{ animationDuration: "0.8s" }}
      />
      <div className="animate-slide-in-right" style={{ animationDuration: "0.8s" }}>
        <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium animate-fade-in" style={{ animationDelay: "0.2s" }}>Why D & N</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>Crafted with heart, served with care.</h2>
        <ul className="space-y-4">
          {[
            "Authentic recipes passed down three generations",
            "Premium rentals & full-service event styling",
            "On-time delivery, anywhere in Nigeria",
            "Custom packages for every budget",
          ].map((t, index) => (
            <li 
              key={t} 
              className="flex gap-3 items-start animate-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"/>
              <span className="text-foreground/80">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

{/* CTA Section */}
<section className="bg-[#b8863b] text-white text-center py-20 px-5">
  <h2 className="text-3xl md:text-5xl font-medium mb-4">
    Ready to Plan Your Next Event?
  </h2>

  <p className="text-base md:text-lg mb-8 opacity-90">
    Reach out on WhatsApp for a free consultation and customised quote.
  </p>

  <a
    href="https://wa.me/2349055177788"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-white text-[#b8863b] px-7 py-3 rounded-full font-medium transition-all duration-300 hover:bg-foreground hover:-translate-y-1"
  >
    <svg viewBox="0 0 24 24" width="20" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
    Chat With Us on WhatsApp
  </a>
</section>

    {/* Gallery */}
    <section className="container py-20">
      <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
        <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">Gallery</span>
        <h2 className="font-display text-4xl md:text-5xl mt-3">A taste of our work</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[jollof, smallChops, buffet, jollof, smallChops, buffet].map((src, i) => (
          <div 
            key={i} 
            className="overflow-hidden rounded-3xl"
            style={{ animationDelay: `${0.2 + i * 0.15}s` }}
          >
            <img 
              src={src} 
              alt="Food sample" 
              width={1024} 
              height={1024} 
              loading="lazy" 
              className="rounded-3xl object-cover w-full aspect-square hover:scale-[1.08] transition-transform duration-700 cursor-pointer animate-scale-in"
            />
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-accent/40 py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
          <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">CUSTOMERS REPORT</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Loved by our clients</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div 
              key={t.name} 
              className="bg-card rounded-3xl p-8 border border-border animate-bounce-in transition-transform hover:scale-[1.05] hover:shadow-lg"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="flex gap-1 text-primary mb-3">
                {[...Array(5)].map((_,i)=><Star key={i} size={14} fill="currentColor"/>)}
              </div>
              <p className="text-foreground/80 italic mb-4">"{t.text}"</p>
              <p className="font-medium text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
