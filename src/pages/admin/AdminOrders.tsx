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

export default function AdminOrders() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<OrderStatus | "all">("all");

  useEffect(() => { fetchOrders(); }, []);

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

  async function updateStatus(id: string, status: OrderStatus) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) console.error("Update error:", error.message);
    else setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h1 className="font-display text-2xl lg:text-3xl">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {loading ? "Loading..." : `${orders.length} order${orders.length !== 1 ? "s" : ""} total`}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">

        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 lg:px-6 py-4 border-b border-border gap-3">
          <h2 className="font-semibold text-base">
            {filter === "all" ? "All Orders" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Orders`}
            {!loading && <span className="text-muted-foreground font-normal text-sm ml-2">({filtered.length})</span>}
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
            {FILTERS.map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap flex-shrink-0
                  ${filter === f.value
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse"/>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-muted-foreground text-sm">No orders found.</div>
        ) : (
          <>
            {/* ── Mobile cards ── */}
            <div className="lg:hidden divide-y divide-border">
              {filtered.map(o => (
                <div key={o.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-medium text-sm">{o.customer_name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{o.customer_phone}</div>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${STATUS_STYLES[o.status]}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </div>
                  <div className="bg-muted/40 rounded-xl px-3 py-2.5 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Item</span>
                      <span className="font-medium text-right">{o.item_name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Price</span>
                      <span className="text-primary font-medium">{o.item_price}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Qty / Guests</span>
                      <span>{o.quantity_or_guests}</span>
                    </div>
                    {o.event_date && (
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Date</span>
                        <span>{o.event_date}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Address</span>
                      <span className="text-right max-w-[60%]">{o.delivery_address}</span>
                    </div>
                    {o.notes && (
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Notes</span>
                        <span className="text-right max-w-[60%] italic">{o.notes}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Update status</span>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value as OrderStatus)}
                      className="bg-background border border-border text-foreground text-xs px-3 py-2 rounded-lg outline-none focus:border-primary cursor-pointer">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="completed">Complete</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Desktop table ── */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Customer", "Item", "Price", "Details", "Date", "Status", "Action"].map(h => (
                      <th key={h} className="text-left text-xs uppercase tracking-wider text-muted-foreground font-medium px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(o => (
                    <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{o.customer_name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{o.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4">{o.item_name}</td>
                      <td className="px-6 py-4 text-primary font-medium">{o.item_price}</td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        {o.quantity_or_guests}{o.delivery_address && ` · ${o.delivery_address}`}
                        {o.notes && <div className="italic mt-0.5">{o.notes}</div>}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">{o.event_date ?? "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select value={o.status} onChange={e => updateStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-background border border-border text-foreground text-xs px-2 py-1.5 rounded-lg outline-none focus:border-primary cursor-pointer">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}