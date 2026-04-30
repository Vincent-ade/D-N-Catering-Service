import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar, { WHATSAPP_URL } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// ── EmailJS config ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_jen8v2o";
const EMAILJS_TEMPLATE_ID = "template_qp5i9ot";
const EMAILJS_PUBLIC_KEY  = "9GHzvPJRcXCegzPBP";

const Contact = () => {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const headerSection         = useScrollAnimation();
  const contentSection        = useScrollAnimation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Stricter email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Block obviously fake domains
    const fakeDomains = ["jnc.com", "test.com", "fake.com", "example.com", "abc.com", "xyz.com"];
    const domain = form.email.split("@")[1]?.toLowerCase();
    if (fakeDomains.includes(domain)) {
      toast.error("Please enter a real email address.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent! We'll be in touch shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section ref={headerSection.ref} className="container py-16 text-center">
        <span className={`text-xs tracking-[0.2em] uppercase text-primary font-medium ${headerSection.isVisible ? "animate-fade-in" : "opacity-0"}`}>Get in touch</span>
        <h1 className={`font-display text-5xl md:text-6xl mt-3 ${headerSection.isVisible ? "animate-fade-up" : "opacity-0"}`}>Let's plan something special</h1>
      </section>

      <section ref={contentSection.ref} className="container grid lg:grid-cols-2 gap-12 pb-20">
        <div className="space-y-6">
          <div className={`bg-card border border-border rounded-3xl p-8 space-y-5 ${contentSection.isVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-accent text-primary"><Phone size={20}/></div>
              <div>
                <h3 className="font-display text-lg">Phone</h3>
                <p className="text-muted-foreground text-sm">+234 905 517 7788</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-accent text-primary"><Mail size={20}/></div>
              <div>
                <h3 className="font-display text-lg">Email</h3>
                <p className="text-muted-foreground text-sm">dnevents2022@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-accent text-primary"><MapPin size={20}/></div>
              <div>
                <h3 className="font-display text-lg">Location</h3>
                <p className="text-muted-foreground text-sm">Ibadan, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-accent text-primary"><MapPin size={20}/></div>
              <div>
                <h3 className="font-display text-lg">Opening Hours</h3>
                <p className="text-muted-foreground text-sm">We're opened 24/7 for bookings</p>
              </div>
            </div>
          </div>

          <Button asChild size="lg" className={`w-full rounded-full bg-whatsapp hover:bg-whatsapp/90 text-white ${contentSection.isVisible ? "animate-bounce-in" : "opacity-0"}`} style={{ animationDelay: contentSection.isVisible ? "0.2s" : "0s" }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2" size={20}/> Chat on WhatsApp
            </a>
          </Button>

          <div className={`flex gap-3 justify-center ${contentSection.isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: contentSection.isVisible ? "0.3s" : "0s" }}>
            <a href="https://www.instagram.com/dn_event/" aria-label="Instagram" className="p-3 rounded-full bg-accent text-foreground hover:bg-primary hover:text-primary-foreground transition"><Instagram size={20}/></a>
            <a href="#" aria-label="Facebook" className="p-3 rounded-full bg-accent text-foreground hover:bg-primary hover:text-primary-foreground transition"><Facebook size={20}/></a>
          </div>
        </div>

        <form onSubmit={submit} className={`bg-card border border-border rounded-3xl p-8 space-y-5 ${contentSection.isVisible ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDuration: "0.8s" }}>
          <h2 className="font-display text-2xl mb-2">Send us a mail</h2>
          <Input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded-xl"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-xl"
          />
          <Textarea
            placeholder="Tell us about your event..."
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="rounded-xl"
          />
          <Button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;