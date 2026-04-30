import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: "Food" | "Rentals";
}

interface OrderModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "2349055177788";

export default function OrderModal({ item, onClose }: OrderModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!item) return null;

  function handleClose() {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setForm({ name: "", phone: "", guests: "", date: "", address: "", notes: "" });
      setErrors({});
    }, 220);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  }

  function validate() {
    const newErrors: Partial<typeof form> = {};
    if (!form.name)   newErrors.name   = "Please enter your name";
    if (!form.phone)  newErrors.phone  = "Please enter your phone number";
    if (!form.guests) newErrors.guests = item.category === "Food" ? "Please select a guest range" : "Please enter a quantity";
    if (item.category === "Food" && !form.date) newErrors.date = "Please pick a date";
    if (!form.address) newErrors.address = "Please enter a delivery address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function sendOrder() {
    if (!validate()) return;

    const formattedDate = form.date
      ? new Date(form.date).toLocaleDateString("en-NG", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
      : null;

    // Save order to Supabase
    const { error } = await supabase.from("orders").insert([{
      customer_name: form.name,
      customer_phone: form.phone,
      item_name: item.name,
      item_price: item.price,
      quantity_or_guests: form.guests,
      event_date: formattedDate,
      delivery_address: form.address,
      notes: form.notes,
      status: "pending",
    }]);

    if (error) {
      console.error("Order save error:", error.message);
      // Still open WhatsApp even if save fails
    }

    const message =
      `Hello D & N!, I'd like to place an order.\n\n` +
      `*Item:* ${item.name}\n` +
      `*Price:* ${item.price}\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*${item.category === "Food" ? "Guests" : "Quantity"}:* ${form.guests}\n` +
      (formattedDate ? `*Date:* ${formattedDate}\n` : "") +
      `*Address:* ${form.address}` +
      (form.notes ? `\n*Notes:* ${form.notes}` : "") +
      `\n\nPlease confirm my order. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    handleClose();
  }

  // Shared input/select/textarea base classes
  const inputBase =
    "font-sans text-sm text-[#1a1a1a] bg-white border border-black/[0.13] rounded-[10px] px-[13px] py-[10px] outline-none w-full transition-[border-color,box-shadow] duration-150 focus:border-[#c0392b] focus:shadow-[0_0_0_3px_rgba(192,57,43,0.09)]";

  return (
    <>
      {/* ── Overlay ── */}
      <div
        className={["fixed inset-0 bg-[rgba(20,16,10,0.6)] backdrop-blur-[5px] z-[1000]","flex items-end justify-center p-0","sm:items-center sm:p-5","opacity-0 transition-opacity [transition-duration:220ms] [transition-timing-function:ease]",visible ? "opacity-100" : "",
        ].join(" ")} onClick={(e) => e.target === e.currentTarget && handleClose()} role="dialog" aria-modal="true" aria-label={`Order ${item.name}`}
      >
        {/* ── Modal ── */}
        <div
          className={["bg-[#faf6ee] rounded-[24px_24px_0_0] w-full max-w-[480px] max-h-[92vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden","font-sans","translate-y-8 transition-transform [transition-duration:260ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]","sm:rounded-[20px] sm:translate-y-5",visible ? "translate-y-0" : "",
          ].join(" ")}
        >
          {/* ── Header ── */}
          <div className="px-7 pt-7 pb-5 border-b border-black/[0.08] relative">
            <button className="absolute top-6 right-6 w-8 h-8 rounded-full border border-black/[0.12] bg-transparent cursor-pointer flex items-center justify-center text-[15px] text-[#777] transition-colors duration-150 leading-none hover:bg-black/[0.06]" onClick={handleClose} aria-label="Close">
              ✕
            </button>

            {/* Tag */}
            <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#c0392b] mb-[5px]">
              Place your order
            </div>

            {/* Title */}
            <div className="font-serif text-[22px] font-semibold text-[#1a1a1a] leading-[1.25]"style={{ fontFamily: "'Playfair Display', serif" }}>
              <em className="italic text-[#c0392b]">{item.name}</em>
            </div>

            {/* Subtitle */}
            <div className="text-[13px] text-[#999] mt-1 font-light" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {item.price} &middot; {item.description}
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-7 pt-6 pb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* Section label — Your details */}
            <SectionLabel>Your details</SectionLabel>

            {/* Name + Phone row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Full name" error={errors.name}>
                <input className={`${inputBase}${errors.name ? " border-[#e74c3c]" : ""}`} id="name" type="text" placeholder="e.g. Amaka Obi" value={form.name} onChange={handleChange}/>
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input className={`${inputBase}${errors.phone ? " border-[#e74c3c]" : ""}`} id="phone" type="tel" placeholder="08012345678" value={form.phone} onChange={handleChange}/>
              </Field>
            </div>

            {/* Section label — Event / Rental details */}
            <SectionLabel>
              {item.category === "Food" ? "Event details" : "Rental details"}
            </SectionLabel>

            {/* Food: guests dropdown + date side by side */}
            {item.category === "Food" && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Number of guests" error={errors.guests}>
                  <select className={[inputBase,"cursor-pointer appearance-none pr-[34px]",
                      // custom chevron via bg-image
                      "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")]","[background-repeat:no-repeat] [background-position:right_13px_center]",errors.guests ? "border-[#e74c3c]" : "",
                    ].join(" ")} id="guests" value={form.guests} onChange={handleChange}
                  >
                    <option value="">Select range</option>
                    <option>Up to 50</option>
                    <option>50 – 100</option>
                    <option>100 – 200</option>
                    <option>200 – 500</option>
                    <option>500+</option>
                  </select>
                </Field>
                <Field label="Event date" error={errors.date}>
                  <input className={`${inputBase}${errors.date ? " border-[#e74c3c]" : ""}`} id="date" type="date" value={form.date} onChange={handleChange}/>
                </Field>
              </div>
            )}

            {/* Rentals: quantity input only */}
            {item.category === "Rentals" && (
              <Field label="Quantity" error={errors.guests}>
                <input className={`${inputBase}${errors.guests ? " border-[#e74c3c]" : ""}`} id="guests" type="number" min="1" placeholder="e.g. 20" value={form.guests} onChange={handleChange}/>
              </Field>
            )}

            {/* Delivery address */}
            <Field label="Delivery address" error={errors.address}>
              <input className={`${inputBase}${errors.address ? " border-[#e74c3c]" : ""}`} id="address" type="text" placeholder="Street, area, city" value={form.address} onChange={handleChange}/>
            </Field>

            {/* Notes */}
            <Field
              label={
                <>
                  Special requests{" "}
                  <span className="text-[#bbb] font-light">(optional)</span>
                </>
              }
            >
              <textarea className={`${inputBase} resize-none h-[76px]`} id="notes" placeholder="Dietary needs, extra spice, serving time..." value={form.notes} onChange={handleChange}/>
            </Field>

            {/* Submit button */}
            <button className="w-full bg-[#1a1a1a] text-[#faf6ee] border-none py-[14px] px-5 font-sans text-sm font-medium tracking-[0.03em] rounded-full cursor-pointer mt-[6px] transition-[background,transform] duration-200 flex items-center justify-center gap-[9px] hover:bg-[#2e2e2e] hover:scale-[1.01] active:scale-[0.99]" onClick={sendOrder}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send Order via WhatsApp
            </button>

            <p className="text-center text-xs text-[#bbb] mt-[11px] leading-[1.5] font-light">
              You'll be taken to WhatsApp to confirm your order with D &amp; N.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Small helper components ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#bbb] mt-1 mb-[14px] flex items-center gap-[10px] after:content-[''] after:flex-1 after:h-px after:bg-black/[0.07]">
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[5px] mb-[14px]">
      <label className="text-[11px] font-medium tracking-[0.05em] uppercase text-[#666]">
        {label}
      </label>
      {children}
      {error && <span className="text-[11px] text-[#e74c3c] mt-0.5">{error}</span>}
    </div>
  );
}