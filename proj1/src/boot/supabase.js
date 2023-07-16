import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vciryepghsmjokaktnap.supabase.co/' // process.env.SUPABASE_URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjaXJ5ZXBnaHNtam9rYWt0bmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyOTAwMzMsImV4cCI6MTk4Mzg2NjAzM30.ga-ivZeIGYJ3NYK4A0hzdZwiqn_fpgUdLz1vP8zOSC0' // process.env.SUPABASE_KEY

const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
  }

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)
