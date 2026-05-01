import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image_url: string | null;
  category: "Food" | "Rentals";
  available: boolean;
  created_at?: string;
}

interface AdminProductsProps {
  category: "Food" | "Rentals";
}

const blankForm = (category: "Food" | "Rentals") => ({
  name: "",
  price: "",
  description: "",
  available: true,
  category,
  image_url: null as string | null,
});

// ── Component ─────────────────────────────────────────────────────────────
export default function AdminProducts({ category }: AdminProductsProps) {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm]           = useState(blankForm(category));
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef                   = useRef<HTMLInputElement>(null);

  // ── Load products from Supabase ─────────────────────────────────────────
  useEffect(() => {
    fetchProducts();
  }, [category]);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data as Product[]);
    }
    setLoading(false);
  }

  // ── Image upload to Supabase Storage ────────────────────────────────────
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    setForm(prev => ({ ...prev, image_url: urlData.publicUrl }));
    setUploading(false);
  }

  // ── Save product ─────────────────────────────────────────────────────────
  async function saveProduct() {
    if (!form.name.trim() || !form.price.trim()) return;
      
    const numericPrice = form.price.replace(/[₦,\s]/g, "");
    if (isNaN(Number(numericPrice)) || numericPrice === "") {
      alert("Please enter a valid price (numbers only, e.g. 45000 or 45,000)");
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name,
      price: `₦${Number(form.price.replace(/[₦,\s]/g, "")).toLocaleString()}`,
      description: form.description,
      category: form.category,
      available: form.available,
      image_url: form.image_url,
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);
      if (error) console.error("Update error:", error.message);
    } else {
      const { error } = await supabase
        .from("products")
        .insert([payload]);
      if (error) console.error("Insert error:", error.message);
    }

    setSaving(false);
    closeModal();
    fetchProducts();
  }

  // ── Delete product ───────────────────────────────────────────────────────
  async function deleteProduct(id: string) {
    if (!window.confirm("Remove this item from the menu?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) console.error("Delete error:", error.message);
    else fetchProducts();
  }

  // ── Toggle availability ──────────────────────────────────────────────────
  async function toggleAvailable(id: string, current: boolean) {
    const { error } = await supabase
      .from("products")
      .update({ available: !current })
      .eq("id", id);
    if (error) console.error("Toggle error:", error.message);
    else fetchProducts();
  }

  // ── Modal helpers ─────────────────────────────────────────────────────────
  function openAdd() {
    setEditingId(null);
    setForm(blankForm(category));
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      available: p.available,
      category: p.category,
      image_url: p.image_url,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(blankForm(category));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { id, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl">
            {category === "Food" ? "Food Menu" : "Rentals"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? "Loading..." : `${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Button onClick={openAdd} className="rounded-full bg-foreground text-background hover:bg-primary">
          + Add {category === "Food" ? "Food Item" : "Rental Item"}
        </Button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${category === "Food" ? "food items" : "rentals"}...`}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-sm bg-card border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors mb-6"
      />

      {/* Loading state */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3].map(i => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
              <div className="h-40 bg-muted"/>
              <div className="p-5 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"/>
                <div className="h-3 bg-muted rounded w-full"/>
                <div className="h-3 bg-muted rounded w-1/2"/>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <div
              key={p.id}
              className={`bg-card border border-border rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30 ${!p.available ? "opacity-50" : ""}`}
            >
              {/* Image */}
              <div className="h-40 bg-muted flex items-center justify-center relative overflow-hidden">
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover"/>
                  : <span className="text-5xl">{category === "Food" ? "🍽️" : "🪑"}</span>
                }
                <span className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full border-2 border-card ${p.available ? "bg-green-500" : "bg-muted-foreground"}`}/>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="font-semibold text-base truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1 mb-3 line-clamp-2 leading-relaxed">{p.description}</div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="font-display text-primary text-lg">{p.price}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      <button
                        onClick={() => toggleAvailable(p.id, p.available)}
                        className={`font-medium transition-colors ${p.available ? "text-green-600 hover:text-red-500" : "text-muted-foreground hover:text-green-600"}`}
                      >
                        {p.available ? "✓ Available" : "✗ Unavailable"}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm"
                      title="Edit">✏️</button>
                    <button onClick={() => deleteProduct(p.id)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:border-red-400 hover:text-red-500 transition-colors text-sm"
                      title="Delete">🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add card */}
          <button
            onClick={openAdd}
            className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground text-sm font-medium min-h-[260px] hover:border-primary hover:text-primary transition-colors"
          >
            <span className="text-3xl">+</span>
            Add {category === "Food" ? "food item" : "rental item"}
          </button>
        </div>
      )}

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <h2 className="font-display text-xl">
                {editingId ? "Edit Item" : `Add ${category} Item`}
              </h2>
              <button onClick={closeModal}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors text-sm">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">

              {/* Image upload */}
              <div
                className="relative border-2 border-dashed border-border rounded-xl h-44 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors overflow-hidden group"
                onClick={() => fileRef.current?.click()}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/>
                    <span className="text-sm">Uploading...</span>
                  </div>
                ) : form.image_url ? (
                  <>
                    <img src={form.image_url} alt="preview" className="absolute inset-0 w-full h-full object-cover rounded-xl"/>
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-sm rounded-xl">
                      📷 Change image
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">📷</span>
                    <span className="text-sm text-muted-foreground">Click to upload product image</span>
                    <span className="text-xs text-muted-foreground/60">JPG, PNG, WEBP</span>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/>
              </div>

              {/* Name + Price */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Item name *</label>
                  <input id="name" value={form.name} onChange={handleChange} placeholder="e.g. Party Jollof Rice"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Price *</label>
                  <input id="price" value={form.price} onChange={handleChange} placeholder="e.g. ₦45,000"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors"/>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Description</label>
                <textarea id="description" value={form.description} onChange={handleChange} placeholder="Short description..."
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none h-20"/>
              </div>

              {/* Available toggle */}
              <div className="flex items-center justify-between bg-background border border-border rounded-lg px-4 py-3">
                <div>
                  <div className="text-sm font-medium">Available for ordering</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Customers can see and order this item</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input id="available" type="checkbox" checked={form.available} onChange={handleChange} className="sr-only peer"/>
                  <div className="w-10 h-6 bg-border rounded-full peer peer-checked:bg-green-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4"/>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Button variant="outline" onClick={closeModal} className="flex-1 rounded-full">Cancel</Button>
                <Button
                  onClick={saveProduct}
                  disabled={!form.name.trim() || !form.price.trim() || saving || uploading}
                  className="flex-1 rounded-full bg-foreground text-background hover:bg-primary"
                >
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Add Item"}
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}