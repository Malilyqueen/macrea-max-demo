-- =============================================
-- Migration: Early Birds Leads Collection
-- Date: 2026-01-31
-- Project: macrea-max-demo
-- Database: Supabase (macrea-max-prod)
-- =============================================
-- IMPORTANT: Cette table est dédiée aux inscriptions Early Birds
-- Isolée de demo_leads (qui gère le lead magnet PDF)
-- =============================================

-- Créer la table earlybirds_leads
CREATE TABLE IF NOT EXISTS public.earlybirds_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    company VARCHAR(150),
    source VARCHAR(50) DEFAULT 'direct' NOT NULL,
    offer VARCHAR(50) DEFAULT 'starter' NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'confirmed', 'error')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index unique sur email (déjà créé par UNIQUE mais explicite pour perf)
CREATE UNIQUE INDEX IF NOT EXISTS idx_earlybirds_leads_email 
ON public.earlybirds_leads(email);

-- Index sur created_at pour requêtes temporelles
CREATE INDEX IF NOT EXISTS idx_earlybirds_leads_created_at 
ON public.earlybirds_leads(created_at DESC);

-- Index sur status pour filtrage rapide
CREATE INDEX IF NOT EXISTS idx_earlybirds_leads_status 
ON public.earlybirds_leads(status);

-- Index sur source pour analytics
CREATE INDEX IF NOT EXISTS idx_earlybirds_leads_source 
ON public.earlybirds_leads(source);

-- Index sur offer pour segmentation
CREATE INDEX IF NOT EXISTS idx_earlybirds_leads_offer 
ON public.earlybirds_leads(offer);

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_earlybirds_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_earlybirds_leads_updated_at
    BEFORE UPDATE ON public.earlybirds_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_earlybirds_leads_updated_at();

-- Commentaires pour documentation
COMMENT ON TABLE public.earlybirds_leads IS 'Inscriptions au programme Early Birds MAX';
COMMENT ON COLUMN public.earlybirds_leads.email IS 'Adresse email du lead (unique)';
COMMENT ON COLUMN public.earlybirds_leads.status IS 'Statut inscription: pending, confirmed, error';
COMMENT ON COLUMN public.earlybirds_leads.source IS 'Source de collecte: demo, tarifs, direct';
COMMENT ON COLUMN public.earlybirds_leads.offer IS 'Offre visée: starter, promax';
COMMENT ON COLUMN public.earlybirds_leads.error_message IS 'Message erreur si échec inscription';

-- Row Level Security (RLS) - Activé mais permissif côté serveur
ALTER TABLE public.earlybirds_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Le service role peut tout faire (utilisé par l'API)
CREATE POLICY "Service role full access" ON public.earlybirds_leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy: Anon peut uniquement INSERT (pour éviter lecture publique)
CREATE POLICY "Anon can insert" ON public.earlybirds_leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- =============================================
-- Pour rollback si besoin :
-- DROP TABLE IF EXISTS public.earlybirds_leads CASCADE;
-- =============================================
