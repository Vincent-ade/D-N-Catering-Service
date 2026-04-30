import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/admin/dashboard" },
  { label: "Orders",    icon: "📋", path: "/admin/orders"    },
  { label: "Food Menu", icon: "🍽️", path: "/admin/food"      },
  { label: "Rentals",   icon: "🪑", path: "/admin/rentals"   },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("dn_admin")) navigate("/admin");
  }, [navigate]);

  // Close mobile menu on route change
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
          <a href="/" target="_blank" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <span>🌐</span> View public site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-red-500 transition-colors">
            <span>🚪</span> Log out
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <div className="font-display text-lg text-foreground">D & N.</div>
        </div>
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
          <div className="px-6 py-3 border-t border-border flex items-center justify-between">
            <a href="/" target="_blank" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <span>🌐</span> View public site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-red-500 transition-colors">
              <span>🚪</span> Log out
            </button>
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