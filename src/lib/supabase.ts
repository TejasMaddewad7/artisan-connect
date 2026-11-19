import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mfdmdcoxfcynttpyhrqt.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_yhVhaUOtkOnq0UPOSYdy3A_iw3Rn2vY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
