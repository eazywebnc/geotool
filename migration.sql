-- GEOTool Migration
-- Tables with gt_ prefix

-- ============================================
-- gt_sites: websites being tracked
-- ============================================
CREATE TABLE IF NOT EXISTS gt_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused')),
  visibility_score INTEGER DEFAULT 0,
  last_scan_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- gt_queries: search queries being monitored
-- ============================================
CREATE TABLE IF NOT EXISTS gt_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  site_id UUID REFERENCES gt_sites(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- gt_rankings: ranking results per query per engine
-- ============================================
CREATE TABLE IF NOT EXISTS gt_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id UUID NOT NULL REFERENCES gt_queries(id) ON DELETE CASCADE,
  site_id UUID NOT NULL REFERENCES gt_sites(id) ON DELETE CASCADE,
  engine TEXT NOT NULL CHECK (engine IN ('chatgpt', 'perplexity', 'gemini', 'claude', 'copilot', 'other')),
  position INTEGER,
  mentioned BOOLEAN DEFAULT false,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  snippet TEXT,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- gt_reports: generated reports
-- ============================================
CREATE TABLE IF NOT EXISTS gt_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('weekly', 'monthly', 'quarterly', 'custom')),
  data JSONB,
  status TEXT NOT NULL DEFAULT 'generating' CHECK (status IN ('generating', 'ready', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- gt_settings: user settings and subscription
-- ============================================
CREATE TABLE IF NOT EXISTS gt_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  report_frequency TEXT DEFAULT 'weekly' CHECK (report_frequency IN ('daily', 'weekly', 'monthly')),
  email_alerts BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================
-- RLS Policies
-- ============================================
ALTER TABLE gt_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE gt_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gt_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gt_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE gt_settings ENABLE ROW LEVEL SECURITY;

-- Sites policies
CREATE POLICY "Users can view own sites" ON gt_sites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sites" ON gt_sites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sites" ON gt_sites FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sites" ON gt_sites FOR DELETE USING (auth.uid() = user_id);

-- Queries policies
CREATE POLICY "Users can view own queries" ON gt_queries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own queries" ON gt_queries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own queries" ON gt_queries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own queries" ON gt_queries FOR DELETE USING (auth.uid() = user_id);

-- Rankings policies (via site ownership)
CREATE POLICY "Users can view own rankings" ON gt_rankings FOR SELECT
  USING (EXISTS (SELECT 1 FROM gt_sites WHERE gt_sites.id = gt_rankings.site_id AND gt_sites.user_id = auth.uid()));

-- Reports policies
CREATE POLICY "Users can view own reports" ON gt_reports FOR SELECT USING (auth.uid() = user_id);

-- Settings policies
CREATE POLICY "Users can view own settings" ON gt_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON gt_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON gt_settings FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_gt_sites_user ON gt_sites(user_id);
CREATE INDEX IF NOT EXISTS idx_gt_queries_user ON gt_queries(user_id);
CREATE INDEX IF NOT EXISTS idx_gt_queries_site ON gt_queries(site_id);
CREATE INDEX IF NOT EXISTS idx_gt_rankings_query ON gt_rankings(query_id);
CREATE INDEX IF NOT EXISTS idx_gt_rankings_site ON gt_rankings(site_id);
CREATE INDEX IF NOT EXISTS idx_gt_rankings_scanned ON gt_rankings(scanned_at);
CREATE INDEX IF NOT EXISTS idx_gt_reports_user ON gt_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_gt_settings_user ON gt_settings(user_id);
