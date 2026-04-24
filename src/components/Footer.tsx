import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { WHATSAPP_URL } from "./Navbar";

const Footer = () => (
  <footer className="bg-foreground text-background mt-24">
    <div className="container grid gap-10 py-16 md:grid-cols-4">
      <div>
        <h3 className="font-display text-2xl mb-3">D & N<span className="text-primary">.</span></h3>
        <p className="text-sm text-background/70 max-w-xs">
          Family-owned catering & event service crafting unforgettable experiences across Nigeria.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Explore</h4>
        <ul className="space-y-2 text-sm text-background/70">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><Link to="/about" className="hover:text-primary">About</Link></li>
          <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-background/70">
          <li className="flex items-center gap-2"><Phone size={14}/> +234 905 517 7788</li>
          <li className="flex items-center gap-2"><Mail size={14}/> dnevents2022@gmail.com</li>
          <li>Ibadan, Nigeria</li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Follow</h4>
        <div className="flex gap-3">
          <a href="https://www.instagram.com/dn_event/" className="p-2 rounded-full bg-background/10 hover:bg-primary transition" aria-label="Instagram"><Instagram size={18}/></a>
          <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition" aria-label="Facebook"><Facebook size={18}/></a>
          <a href={WHATSAPP_URL} className="p-2 rounded-full bg-background/10 hover:bg-primary transition" aria-label="WhatsApp">WA</a>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
      © {new Date().getFullYear()} D & N Catering & Events. All rights reserved.
    </div>
  </footer>
);

export default Footer;
