import { createAdminClient } from '@/lib/supabase/server'

/**
 * Ensures the authenticated user has a gt_settings record.
 * Called on first dashboard access to support cross-SaaS login.
 */
export async function ensureUserProfile(userId: string) {
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('gt_settings')
    .select('user_id')
    .eq('user_id', userId)
    .single()

  if (existing) return

  await supabase.from('gt_settings').upsert(
    {
      user_id: userId,
      plan: 'free',
      report_frequency: 'weekly',
      email_alerts: true,
    },
    { onConflict: 'user_id' }
  )
}
