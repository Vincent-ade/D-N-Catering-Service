import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/2349055177788";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
          D & N<span className="text-primary">.</span>
        </Link>

        {/* Right-aligned desktop links */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Shop Today
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container flex flex-col items-end gap-4 py-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${isActive ? "text-primary" : "text-foreground/80"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild className="rounded-full bg-primary text-primary-foreground">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Shop Today
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
export { WHATSAPP_URL };
