import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import eventSetup from "@/assets/event-setup.jpg";
import ourChef from "@/assets/Our-chef.jpg"
import buffet from "@/assets/buffet.jpg";
import Team from "@/assets/Team.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

// Auto-scrolling marquee styles injected once
const marqueeStyles = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
`;

const stats = [
  { number: "14+", label: "Years of experience" },
  { number: "500+", label: "Events catered" },
  { number: "1", label: "Generations of family" },
  { number: "10k+", label: "Guests served" },
];

const companies = [
  "Access Bank",
  "GTBank",
  "MTN Nigeria",
  "Zenith Bank",
  "Total Energies",
  "First Bank",
];

const About = () => {
  // Scroll animation refs
  const heroSection = useScrollAnimation();
  const storySection = useScrollAnimation();
  const missionSection = useScrollAnimation();
  const experienceSection = useScrollAnimation();
  const statsSection = useScrollAnimation();
  const founderHeaderSection = useScrollAnimation();
  const founderSection = useScrollAnimation();
  const companiesSection = useScrollAnimation();

  return (
  <div className="min-h-screen bg-background">
    <style>{marqueeStyles}</style>
    <Navbar />

    <section ref={heroSection.ref} className="container py-20">
      <span className={`text-xs tracking-[0.2em] uppercase text-primary font-medium ${heroSection.isVisible ? "animate-fade-in" : "opacity-0"}`}>About us</span>
      <h1 className={`font-display text-5xl md:text-6xl mt-3 max-w-3xl leading-tight ${heroSection.isVisible ? "animate-fade-up" : "opacity-0"}`}>
        A family kitchen turned event house.
      </h1>

        <div className="absolute bottom-0 right-[8%] pointer-events-none" style={{ width: 220, height: 500 }}>        <style>{`
          @keyframes flowerDrop {
            0%   { opacity:0; transform: translateY(-60px) rotate(-20deg); }
            60%  { opacity:1; transform: translateY(8px) rotate(3deg); }
            100% { opacity:1; transform: translateY(0px) rotate(0deg); }
          }
          @keyframes flowerSway {
            0%,100% { transform: rotate(0deg); }
            25%     { transform: rotate(4deg); }
            75%     { transform: rotate(-4deg); }
          }
          @keyframes petalPop {
            0%   { transform: scale(0); opacity:0; }
            70%  { transform: scale(1.1); opacity:1; }
            100% { transform: scale(1); opacity:0.92; }
          }
          @keyframes centerPulse {
            0%,100% { r:14; } 50% { r:16; }
          }
          .fl-wrap { animation: flowerDrop 1.1s cubic-bezier(0.34,1.56,0.64,1) 0.2s both; transform-origin: top right; }
          .fl-stem { animation: flowerSway 4s ease-in-out 1.4s infinite; transform-origin: 130px 150px; }
          .fl-petal { animation: petalPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
          .fl-p1{animation-delay:1.1s;transform-origin:130px 120px;}
          .fl-p2{animation-delay:1.2s;transform-origin:130px 120px;}
          .fl-p3{animation-delay:1.3s;transform-origin:130px 120px;}
          .fl-p4{animation-delay:1.4s;transform-origin:130px 120px;}
          .fl-p5{animation-delay:1.5s;transform-origin:130px 120px;}
          .fl-p6{animation-delay:1.6s;transform-origin:130px 120px;}
          .fl-p7{animation-delay:1.7s;transform-origin:130px 120px;}
          .fl-p8{animation-delay:1.8s;transform-origin:130px 120px;}
          .fl-center { animation: centerPulse 2.5s ease-in-out 2s infinite; }
        `}</style>
        <svg className="fl-wrap" width="220" height="310" viewBox="0 0 220 310" fill="none">
          <g className="fl-stem">
            <path d="M130 150 C128 200,125 230,120 280" stroke="#6B8C5A" strokeWidth="3" strokeLinecap="round"/>
            <path d="M126 200 C110 185,95 188,85 195" stroke="#6B8C5A" strokeWidth="2.5" strokeLinecap="round"/>
            <ellipse cx="80" cy="196" rx="14" ry="9" fill="#7AAD65" transform="rotate(-25 80 196)" opacity="0.9"/>
            <path d="M127 228 C145 215,158 218,162 225" stroke="#6B8C5A" strokeWidth="2.5" strokeLinecap="round"/>
            <ellipse cx="167" cy="226" rx="13" ry="8" fill="#7AAD65" transform="rotate(20 167 226)" opacity="0.9"/>
          </g>
          {[0,45,90,135,180,225,270,315].map((deg, i) => (
            <g key={deg} className={`fl-petal fl-p${i+1}`} style={{animationDelay:`${1.1+i*0.1}s`}}>
              <ellipse cx="130" cy="88" rx="13" ry="30" fill={i%2===0?"#E8A87C":"#D4846A"} opacity={i%2===0?0.92:0.88} transform={`rotate(${deg} 130 120)`}/>
            </g>
          ))}
          <circle className="fl-center" cx="130" cy="120" r="14" fill="#C1704A"/>
          <circle cx="130" cy="120" r="8" fill="#E8C49A"/>
        </svg>
      </div>
    </section>

    <section ref={storySection.ref} className="container grid lg:grid-cols-2 gap-12 items-center pb-20">
      <img src={eventSetup} alt="Event setup" width={1280} height={896} loading="lazy" className={`rounded-[2rem] object-cover w-full aspect-[4/3] shadow-xl transition-transform hover:scale-[1.02] ${storySection.isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}/>
      <div className={`space-y-6 text-foreground/80 ${storySection.isVisible ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}>
        <p className="text-lg">
          D & N began in 2010 as a small home kitchen in Lagos, where our matriarch cooked for friends, family, and neighbors. Word spread fast — and what started as plates of jollof became Nigeria's most heartfelt catering and event company.
        </p>
        <p>
          Today, we together as a family work side by side to bring warmth, tradition, and modern elegance to every event we touch.
        </p>
      </div>
    </section>

    <section ref={missionSection.ref} className="bg-accent/40 py-20">
      <div className="container grid md:grid-cols-3 gap-10">
        {[
          { title: "Our Mission", text: "To make every celebration feel personal, beautiful, and effortlessly delicious." },
          { title: "Our Values", text: "Hospitality, craftsmanship, and respect for tradition guide everything we do." },
          { title: "Our Promise", text: "Premium ingredients, punctual service, and details that delight." },
        ].map((b, index) => (
          <div key={b.title} className={missionSection.isVisible ? "animate-bounce-in" : "opacity-0"} style={{ animationDelay: missionSection.isVisible ? `${0.1 + index * 0.15}s` : "0s" }}>
            <h3 className="font-display text-2xl mb-3 text-center">{b.title}</h3>
            <p className="text-foreground/70 text-center">{b.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section ref={experienceSection.ref} className="container py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div className={experienceSection.isVisible ? "animate-slide-in-left" : "opacity-0"} style={{ animationDuration: "0.8s" }}>
        <h2 className={`font-display text-4xl md:text-5xl mb-6 ${experienceSection.isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>Experience & specialties</h2>
        <p className={`text-foreground/80 mb-6 ${experienceSection.isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          From intimate dinners to thousand-guest weddings, we've catered it all. Our specialties include traditional Nigerian cuisine, continental menus, full event styling, and premium equipment rentals.
        </p>
        <ul className="grid grid-cols-2 gap-3 text-sm">
          {["Weddings", "Corporate events", "Birthdays", "Anniversaries", "Funerals", "Conferences", "Private dinners", "Baby showers"].map((s, index) => (
            <li 
              key={s} 
              className={`flex items-center gap-2 ${experienceSection.isVisible ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: experienceSection.isVisible ? `${0.4 + index * 0.08}s` : "0s" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary"/>{s}
            </li>
          ))}
        </ul>
      </div>
      <img src={Team} alt="Catering buffet spread" width={1024} height={1024} loading="lazy" className={`rounded-[2rem] object-cover w-full aspect-square shadow-xl transition-transform hover:scale-[1.02] ${experienceSection.isVisible ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}/>
    </section>

    {/* ── Stats ── */}
    <section ref={statsSection.ref} className="border-y border-border py-14">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center stats-grid">
        {stats.map((s, index) => {
          // Extract number from string like "14+" or "500+"
          const numberMatch = s.number.match(/(\d+)/);
          const numberValue = numberMatch ? parseInt(numberMatch[1]) : 0;
          const animatedCount = useCounterAnimation(numberValue, statsSection.isVisible);
          const suffix = s.number.replace(/\d+/g, ""); // Get "+" or anything after the number

          return (
            <div key={s.label} className={`count-item ${statsSection.isVisible ? "animate-bounce-in" : "opacity-0"}`} style={{ animationDelay: statsSection.isVisible ? `${0.1 + index * 0.15}s` : "0s" }}>
              <div className="stat-num font-display text-5xl text-primary">{animatedCount}{suffix}</div>
              <p className="text-sm text-foreground/60 mt-1 tracking-wide">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>

    <section ref={founderHeaderSection.ref} className="container py-16 text-center">
      <span className={`text-xs tracking-[0.2em] uppercase text-primary font-medium ${founderHeaderSection.isVisible ? "animate-fade-in" : "opacity-0"}`}>OWNERSHIP</span>
      <h1 className={`font-display text-5xl md:text-6xl mt-3 ${founderHeaderSection.isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>FOUNDER</h1>
      <p className={`mt-4 text-muted-foreground max-w-xl mx-auto ${founderHeaderSection.isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
        To order for any meal or event, you will be speaking to the owner directly. Below are more details about her.
      </p>
    </section>

    <section ref={founderSection.ref} className="container grid lg:grid-cols-2 gap-12 items-center pb-20">
      <img src={ourChef} alt="Event setup" width={1280} height={896} loading="lazy" className={`rounded-[2rem] object-cover w-full aspect-[4/3] shadow-xl transition-transform hover:scale-[1.02] ${founderSection.isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}/>
      <div className={`space-y-6 text-foreground/80 ${founderSection.isVisible ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}>
        <h1 className={`font-display text-5xl md:text-6xl mt-3 ${founderSection.isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>Mrs. Temitayo</h1>
        <p className={`text-lg ${founderSection.isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          She has devoted her life to serving people food across the world, pouring her heart, time, and energy into every aspect of her work. Her passion goes beyond cooking; she is deeply committed to creating meaningful experiences for every client she serves. With a strong sense of responsibility, she ensures that each person is treated with respect, warmth, and genuine care.      
        </p>
        <p className={founderSection.isVisible ? "animate-fade-in" : "opacity-0"} style={{ animationDelay: "0.4s" }}>
          Through long hours, sacrifice, and unwavering dedication, she has built a reputation for excellence and reliability. Her ability to consistently deliver quality service has earned her trust and admiration, making her a remarkable figure whose impact continues to be felt wherever she goes.  
        </p>
      </div>
    </section>

    {/* ── Companies We've Worked With ── */}
    <section ref={companiesSection.ref} className="py-8 border-t border-border overflow-hidden">
      <div className="container mb-2 text-center">
        <span className={`text-xs tracking-[0.2em] uppercase text-primary font-medium ${companiesSection.isVisible ? "animate-fade-in" : "opacity-0"}`}>Our Clients</span>
        <h2 className={`font-display text-4xl md:text-5xl mt-3 ${companiesSection.isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: companiesSection.isVisible ? "0.1s" : "0s" }}>Companies We've Worked With</h2>
        <p className={`mt-3 text-muted-foreground max-w-lg mx-auto text-sm ${companiesSection.isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: companiesSection.isVisible ? "0.2s" : "0s" }}>
          Trusted by leading organisations across Nigeria to deliver exceptional catering and event experiences.
        </p>
      </div>

      {/* Fading edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        {/* Marquee — list is duplicated so the loop is seamless */}
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...companies, ...companies].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center mx-6 px-8 py-4 rounded-xl border border-border bg-accent/30 whitespace-nowrap"
                style={{ minWidth: "fit-content" }}
              >
                {/* Decorative dot accent */}
                <span className="w-2 h-2 rounded-full bg-primary mr-3 opacity-70 flex-shrink-0" />
                <span className="font-medium text-foreground/80 text-sm tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default About;