import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This client is safe to use in "use client" files
  // because it doesn't touch the server-only 'next/headers'
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}