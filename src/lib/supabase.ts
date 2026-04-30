import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cawwyrsvgodhcbcyzatg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhd3d5cnN2Z29kaGNiY3l6YXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NzI3NjAsImV4cCI6MjA5MzE0ODc2MH0.2G_N6NUlr6R_WWX5fIJNo0AgyVVwQQsaWaamjHgs3rI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);