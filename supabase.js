// ===== SUPABASE CONFIGURATION =====

const SUPABASE_URL = "https://lzergelhmrkuaqjbplmx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uVSgG6-OdYjsBnw4ooYK6A_9Y12TK6s";

// Initialize Supabase client
let supabaseClient;

try {
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✓ Supabase client initialized successfully');
  } else {
    console.error('✗ Supabase library not loaded - check CDN import in HTML');
  }
} catch (error) {
  console.error('✗ Error initializing Supabase:', error);
}

// Test connection
async function testSupabaseConnection() {
  try {
    if (!supabaseClient) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    // Attempt a simple read to verify connection
    const { data, error } = await supabaseClient
      .from('quiz_leads')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    
    console.log('✓ Supabase connection verified');
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
}

// Run connection test when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Delay test slightly to ensure Supabase library is fully loaded
  setTimeout(() => {
    testSupabaseConnection();
  }, 100);
});