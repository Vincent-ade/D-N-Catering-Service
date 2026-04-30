import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────
export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  item_name: string;
  item_price: string;
  quantity_or_guests: string;
  event_date: string | null;
  delivery_address: string;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
}

// ── Status styles ─────────────────────────────────────────────────────────
const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const FILTERS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All",       value: "all"       },
  { label: "Pending",   value: "pending"   },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
];

export default function AdminDashboard() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<OrderStatus | "all">("all");
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetchOrders();
    fetchProductCount();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching orders:", error.message);
    else setOrders(data as Order[]);
    setLoading(false);
  }

  async function fetchProductCount() {
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });
    setProductCount(count ?? 0);
  }

  async function updateStatus(id: string, status: OrderStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) console.error("Update error:", error.message);
    else setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }

  // ── Derived stats ─────────────────────────────────────────────────────
  const completed = orders.filter(o => o.status === "completed");
  const revenue   = completed.reduce((sum, o) => {
    const num = parseFloat(o.item_price.replace(/[₦,]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
  const pending = orders.filter(o => o.status === "pending").length;

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-display text-3xl">
          Welcome Back, <span className="text-primary italic">D & N</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {new Date().toLocaleDateString("en-NG", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Orders",  value: orders.length,                  sub: "All time"             },
          { label: "Revenue",       value: `₦${revenue.toLocaleString()}`, sub: "From completed orders" },
          { label: "Pending",       value: pending,                        sub: "Awaiting confirmation" },
          { label: "Products",      value: productCount,                   sub: "Food + Rentals"        },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{s.label}</div>
            <div className="font-display text-3xl text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-base">
            Orders
            {!loading && <span className="text-muted-foreground font-normal text-sm ml-2">({orders.length})</span>}
          </h2>
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                  ${filter === f.value
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-12 bg-muted rounded-lg animate-pulse"/>
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Customer", "Item", "Details", "Date", "Status", "Action"].map(h => (
                    <th key={h} className="text-left text-xs uppercase tracking-wider text-muted-foreground font-medium px-6 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground text-sm">
                      No orders found.
                    </td>
                  </tr>
                ) : filtered.map(o => (
                  <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{o.customer_name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{o.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4">{o.item_name}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {o.quantity_or_guests}
                      {o.delivery_address && ` · ${o.delivery_address}`}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                      {o.event_date ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={o.status}
                        onChange={e => updateStatus(o.id, e.target.value as OrderStatus)}
                        className="bg-background border border-border text-foreground text-xs px-2 py-1.5 rounded-lg outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Complete</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}