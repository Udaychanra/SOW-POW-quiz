import "server-only";
import { createClient } from "@supabase/supabase-js";

const EXISTING_SUPABASE_URL = "https://lzergelhmrkuaqjbplmx.supabase.co";
const EXISTING_SUPABASE_ANON_KEY = "sb_publishable_uVSgG6-OdYjsBnw4ooYK6A_9Y12TK6s";

export function createQuizSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || EXISTING_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || EXISTING_SUPABASE_ANON_KEY;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
