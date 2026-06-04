import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rfuuiggomdovfwgrkfpc.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_Sqo1-lcWffQmmUXcSBRilA_xO-3SPoU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
