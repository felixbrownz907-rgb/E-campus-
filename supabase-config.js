// ==========================================
// E-CAMPUS SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL = "https://nchopcxhbggydnzyrhtf.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_Dw3tmVPtZ5cxG9aBHIPBnQ_WiJOqeCF";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
