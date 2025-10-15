// src/components/supabaseClient.jsx

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://vzxtvpuyprcrqxbumyvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6eHR2cHV5cHJjcnF4YnVteXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMTEyODYsImV4cCI6MjA3NTc4NzI4Nn0.XK8KxN31zGCit8GM0n_jZqTBHFIpADi1ODD9W2E0qOU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;