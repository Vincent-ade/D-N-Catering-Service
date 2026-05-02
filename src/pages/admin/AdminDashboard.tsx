import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [orderCount, setOrderCount]     = useState(0);
  const [revenue, setRevenue]           = useState(0);
  const [pending, setPending]           = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);

    // Fetch all orders
    const { data: orders } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (orders) {
      setOrderCount(orders.length);
      setPending(orders.filter(o => o.status === "pending").length);
      const completedRevenue = orders
        .filter(o => o.status === "completed")
        .reduce((sum, o) => {
          const num = parseFloat(o.item_price.replace(/[₦,\s]/g, ""));
          return sum + (isNaN(num) ? 0 : num);
        }, 0);
      setRevenue(completedRevenue);
      setRecentOrders(orders.slice(0, 3)); // latest 3 orders
    }

    // Fetch product count
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });
    setProductCount(count ?? 0);

    setLoading(false);
  }

  const STATUS_STYLES: Record<string, string> = {
    pending:   "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl">
          Welcome Back, <span className="text-primary italic">D & N</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {new Date().toLocaleDateString("en-NG", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {loading ? (
          [1,2,3,4].map(i => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
              <div className="h-3 bg-muted rounded w-2/3 mb-3"/>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"/>
              <div className="h-3 bg-muted rounded w-1/2"/>
            </div>
          ))
        ) : (
          [
            { label: "Total Orders", value: orderCount,                  sub: "All time",             color: "text-primary",    path: "/admin/orders"  },
            { label: "Revenue",      value: `₦${revenue.toLocaleString()}`, sub: "Completed orders",  color: "text-amber-500",  path: "/admin/orders"  },
            { label: "Pending",      value: pending,                     sub: "Awaiting confirmation", color: "text-green-600",  path: "/admin/orders"  },
            { label: "Products",     value: productCount,                sub: "Food + Rentals",        color: "text-blue-500",   path: "/admin/food"    },
          ].map((s, i) => (
            <Link key={i} to={s.path}
              className="bg-card border border-border rounded-2xl p-4 lg:p-5 hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div className="text-[10px] lg:text-xs uppercase tracking-widest text-muted-foreground mb-2">{s.label}</div>
              <div className={`font-display text-2xl lg:text-3xl ${s.color}`}>{s.value}</div>
              <div className="text-[10px] lg:text-xs text-muted-foreground mt-1">{s.sub}</div>
            </Link>
          ))
        )}
      </div>

      {/* Recent Orders preview */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-base">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs text-primary hover:underline font-medium">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-14 bg-muted rounded-xl animate-pulse"/>)}
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground text-sm">
            No orders yet. They'll appear here when customers order.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map(o => (
              <div key={o.id} className="px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{o.customer_name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">{o.item_name} · {o.delivery_address}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">{o.event_date ?? "—"}</span>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}