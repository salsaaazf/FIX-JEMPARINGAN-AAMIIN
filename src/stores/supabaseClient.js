// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cnlanrrpeozflronxvgr.supabase.co' // Dari langkah 1
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNubGFucnJwZW96Zmxyb254dmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDE4MjYsImV4cCI6MjA3OTcxNzgyNn0.HBDmccOgCPmmIbaJD7WgxMnb96OA-5L0xw_gmUloIqI' // Dari langkah 1

export const supabase = createClient(supabaseUrl, supabaseAnonKey)