import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cream: "hsl(var(--cream))",
        terracotta: "hsl(var(--terracotta))",
        olive: "hsl(var(--olive))",
        whatsapp: "hsl(var(--whatsapp))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-in-left": { "0%": { opacity: "0", transform: "translateX(-40px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "slide-in-right": { "0%": { opacity: "0", transform: "translateX(40px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        "scale-in": { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "bounce-in": { "0%": { opacity: "0", transform: "scale(0.85)" }, "50%": { opacity: "1" }, "100%": { opacity: "1", transform: "scale(1)" } },
        "rotate-icon": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(180deg)" } },
        "flip-open": { "0%": { transform: "rotateX(0deg)" }, "100%": { transform: "rotateX(180deg)" } },
        "expand-content": { "0%": { opacity: "0", transform: "translateY(-10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "pulse-glow": { "0%, 100%": { boxShadow: "0 0 0 0 rgba(184, 134, 59, 0.7)" }, "50%": { boxShadow: "0 0 0 10px rgba(184, 134, 59, 0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.8s ease-out 0.2s both",
        "slide-in-left": "slide-in-left 0.7s ease-out both",
        "slide-in-right": "slide-in-right 0.7s ease-out both",
        "scale-in": "scale-in 0.6s cubic-bezier(0.23, 1, 0.320, 1) both",
        "bounce-in": "bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both",
        "rotate-icon": "rotate-icon 0.4s ease-in-out forwards",
        "flip-open": "flip-open 0.6s ease-in-out forwards",
        "expand-content": "expand-content 0.4s ease-out forwards",
        "pulse-glow": "pulse-glow 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
