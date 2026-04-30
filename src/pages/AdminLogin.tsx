import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("dn_admin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Incorrect password. Try again.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-foreground">D & N.</h1>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="font-display text-xl mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your password to access the dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Password
              </label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="••••••••" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors" autoFocus
              />
              {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
            </div>

            <Button type="submit" disabled={loading || !password} className="w-full rounded-full bg-foreground text-background hover:bg-primary">
              {loading ? "Checking..." : "Enter Dashboard"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-foreground transition-colors">
            ← Back to D & N website
          </a>
        </p>
      </div>
    </div>
  );
}
