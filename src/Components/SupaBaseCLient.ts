import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xkjruyborlazoqjjqqus.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhranJ1eWJvcmxhem9xampxcXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NTI5OTQsImV4cCI6MjA3NTEyODk5NH0.r572zbVL5wgRzaXl4J2qXiIc3q42JovUCel-FnxV7ec";


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
