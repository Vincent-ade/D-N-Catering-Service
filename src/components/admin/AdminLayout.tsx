import { useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/admin/dashboard" },
  { label: "Orders",    icon: "📋", path: "/admin/orders" },
  { label: "Food Menu", icon: "🍽️", path: "/admin/food" },
  { label: "Rentals",   icon: "🪑", path: "/admin/rentals" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (!sessionStorage.getItem("dn_admin")) {
      navigate("/admin");
    }
  }, [navigate]);

  function handleLogout() {
    sessionStorage.removeItem("dn_admin");
    navigate("/admin");
  }

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Sidebar ── */}
      <aside className="w-56 bg-card border-r border-border flex flex-col fixed top-0 left-0 bottom-0 z-10">

        {/* Logo */}
        <div className="px-6 py-7 border-b border-border">
          <div className="font-display text-xl text-foreground">D & N.</div>
          <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-1">
            Admin
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border space-y-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>🌐</span> View public site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-red-500 transition-colors"
          >
            <span>🚪</span> Log out
          </button>
        </div>
      </aside>

      {/* ── Page content ── */}
      <main className="ml-56 flex-1 p-8 min-h-screen">
        <Outlet />
      </main>

    </div>
  );
}
