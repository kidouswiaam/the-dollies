import { isSupabaseConfigured } from '../lib/supabase'

export default function SupabaseSetupNotice() {
  if (isSupabaseConfigured) return null

  return (
    <div
      role="alert"
      className="relative z-[100] bg-dark text-cream px-4 py-3 text-center text-sm leading-relaxed"
    >
      <strong className="font-semibold">Store data is not connected.</strong>{' '}
      Add{' '}
      <code className="rounded bg-cream/15 px-1.5 py-0.5 text-xs">VITE_SUPABASE_URL</code> and{' '}
      <code className="rounded bg-cream/15 px-1.5 py-0.5 text-xs">VITE_SUPABASE_ANON_KEY</code> in
      Vercel → Settings → Environment Variables, then redeploy.
    </div>
  )
}
