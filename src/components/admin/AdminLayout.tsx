import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/admin/dashboard" },
  { label: "Orders",    icon: "📋", path: "/admin/orders"    },
  { label: "Food Menu", icon: "🍽️", path: "/admin/food"      },
  { label: "Rentals",   icon: "🪑", path: "/admin/rentals"   },
];

type Theme = "light" | "dark" | "system";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("dn_theme") as Theme) || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (theme === "system" && systemDark)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("dn_theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const icons: Record<Theme, string> = { light: "☀️", dark: "🌙", system: "💻" };
  const options: { value: Theme; label: string; icon: string }[] = [
    { value: "light",  label: "Light",  icon: "☀️" },
    { value: "dark",   label: "Dark",   icon: "🌙" },
    { value: "system", label: "System", icon: "💻" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
        title="Change theme"
      >
        <span>{icons[theme]}</span>
        <span className="capitalize">{theme} mode</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-36 z-50">
          {options.map(o => (
            <button
              key={o.value}
              onClick={() => { setTheme(o.value); setOpen(false); }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 text-xs transition-colors
                ${theme === o.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              <span>{o.icon}</span>
              {o.label}
              {theme === o.value && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLayout() {
  const location               = useLocation();
  const navigate               = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme }    = useTheme();

  useEffect(() => {
    if (!sessionStorage.getItem("dn_admin")) navigate("/admin");
  }, [navigate]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  function handleLogout() {
    sessionStorage.removeItem("dn_admin");
    navigate("/admin");
  }

  const currentPage = navItems.find(n => n.path === location.pathname);

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-56 bg-card border-r border-border flex-col fixed top-0 left-0 bottom-0 z-10">
        <div className="px-6 py-7 border-b border-border">
          <div className="font-display text-xl text-foreground">D & N.</div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">Admin</div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-border space-y-3">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <a href="https://d-n-catering-service.vercel.app/" target="_blank"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <span>🌐</span> View public site
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-red-500 transition-colors">
            <span>🚪</span> Log out
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="font-display text-lg text-foreground">D & N.</div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{currentPage?.icon} {currentPage?.label}</span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-20 bg-card border-b border-border shadow-lg">
          <nav className="px-3 py-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-6 py-3 border-t border-border space-y-3">
            {/* Theme toggle in mobile menu too */}
            <div className="flex gap-2">
              {(["light", "dark", "system"] as Theme[]).map(t => (
                <button key={t} onClick={() => setTheme(t)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors capitalize
                    ${theme === t
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                >
                  {t === "light" ? "☀️" : t === "dark" ? "🌙" : "💻"} {t}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <a href="https://d-n-catering-service.vercel.app/" target="_blank"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <span>🌐</span> View public site
              </a>
              <button onClick={handleLogout}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-red-500 transition-colors">
                <span>🚪</span> Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page content ── */}
      <main className="lg:ml-56 flex-1 p-4 lg:p-8 min-h-screen pt-20 lg:pt-8">
        <Outlet />
      </main>

    </div>
  );
}