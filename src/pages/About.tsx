import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eventSetup from "@/assets/event-setup.jpg";
import buffet from "@/assets/buffet.jpg";

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="container py-20">
      <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">About us</span>
      <h1 className="font-display text-5xl md:text-6xl mt-3 max-w-3xl leading-tight">
        A family kitchen turned event house.
      </h1>
    </section>

    <section className="container grid lg:grid-cols-2 gap-12 items-center pb-20">
      <img src={eventSetup} alt="Event setup" width={1280} height={896} loading="lazy" className="rounded-[2rem] object-cover w-full aspect-[4/3] shadow-xl"/>
      <div className="space-y-6 text-foreground/80">
        <p className="text-lg">
          D & N began in 2010 as a small home kitchen in Lagos, where our matriarch cooked for friends, family, and neighbors. Word spread fast — and what started as plates of jollof became Nigeria's most heartfelt catering and event company.
        </p>
        <p>
          Today, three generations work side by side to bring warmth, tradition, and modern elegance to every event we touch.
        </p>
      </div>
    </section>

    <section className="bg-accent/40 py-20">
      <div className="container grid md:grid-cols-3 gap-10">
        {[
          { title: "Our Mission", text: "To make every celebration feel personal, beautiful, and effortlessly delicious." },
          { title: "Our Values", text: "Hospitality, craftsmanship, and respect for tradition guide everything we do." },
          { title: "Our Promise", text: "Premium ingredients, punctual service, and details that delight." },
        ].map((b) => (
          <div key={b.title}>
            <h3 className="font-display text-2xl mb-3">{b.title}</h3>
            <p className="text-foreground/70">{b.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-display text-4xl md:text-5xl mb-6">Experience & specialties</h2>
        <p className="text-foreground/80 mb-6">
          From intimate dinners to thousand-guest weddings, we've catered it all. Our specialties include traditional Nigerian cuisine, continental menus, full event styling, and premium equipment rentals.
        </p>
        <ul className="grid grid-cols-2 gap-3 text-sm">
          {["Weddings", "Corporate events", "Birthdays", "Anniversaries", "Funerals", "Conferences", "Private dinners", "Baby showers"].map((s) => (
            <li key={s} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"/>{s}</li>
          ))}
        </ul>
      </div>
      <img src={buffet} alt="Catering buffet spread" width={1024} height={1024} loading="lazy" className="rounded-[2rem] object-cover w-full aspect-square shadow-xl"/>
    </section>

    <section className="container py-20">
      <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">FOUNDER</span>
      <h1 className="font-display text-5xl md:text-6xl mt-3 max-w-3xl leading-tight">
        Dignity Behind All The Masterdishes.
      </h1>
    </section>

    <section className="container grid lg:grid-cols-2 gap-12 items-center pb-20">
      <img src={eventSetup} alt="Event setup" width={1280} height={896} loading="lazy" className="rounded-[2rem] object-cover w-full aspect-[4/3] shadow-xl"/>
      <div className="space-y-6 text-foreground/80">
        <p className="text-lg">
          D & N began in 2010 as a small home kitchen in Lagos, where our matriarch cooked for friends, family, and neighbors. Word spread fast — and what started as plates of jollof became Nigeria's most heartfelt catering and event company.
        </p>
        <p>
          Today, three generations work side by side to bring warmth, tradition, and modern elegance to every event we touch.
        </p>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
