-- =============================================
-- Migration: Demo Leads Collection
-- Date: 2026-01-17
-- Project: macrea-max-demo
-- Database: Supabase (macrea-max-prod)
-- =============================================
-- IMPORTANT: Cette table est ISOLÉE du core MAX.
-- Elle sert uniquement à la collecte demo landing.
-- =============================================

-- Créer la table demo_leads
CREATE TABLE IF NOT EXISTS public.demo_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    company VARCHAR(150),
    industry VARCHAR(100),
    source VARCHAR(50) DEFAULT 'landing-demo' NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'sent', 'error')),
    pdf_sent BOOLEAN DEFAULT FALSE NOT NULL,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    last_sent_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index unique sur email (déjà créé par UNIQUE mais explicite pour perf)
CREATE UNIQUE INDEX IF NOT EXISTS idx_demo_leads_email 
ON public.demo_leads(email);

-- Index sur created_at pour requêtes temporelles
CREATE INDEX IF NOT EXISTS idx_demo_leads_created_at 
ON public.demo_leads(created_at DESC);

-- Index sur status pour filtrage rapide
CREATE INDEX IF NOT EXISTS idx_demo_leads_status 
ON public.demo_leads(status);

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_demo_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_demo_leads_updated_at
    BEFORE UPDATE ON public.demo_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_demo_leads_updated_at();

-- Commentaires pour documentation
COMMENT ON TABLE public.demo_leads IS 'Collecte des leads depuis la landing demo M.A.X. (isolée du core produit)';
COMMENT ON COLUMN public.demo_leads.email IS 'Adresse email du lead (unique)';
COMMENT ON COLUMN public.demo_leads.status IS 'Statut envoi: pending, sent, error';
COMMENT ON COLUMN public.demo_leads.pdf_sent IS 'PDF MaCréa CRM envoyé avec succès';
COMMENT ON COLUMN public.demo_leads.error_message IS 'Message erreur si échec envoi';
COMMENT ON COLUMN public.demo_leads.source IS 'Source de collecte (défaut: landing-demo)';

-- Row Level Security (RLS) - Activé mais permissif côté serveur
ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Le service role peut tout faire (utilisé par l'API)
CREATE POLICY "Service role full access" ON public.demo_leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy: Anon peut uniquement INSERT (pour éviter lecture publique)
CREATE POLICY "Anon can insert" ON public.demo_leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- =============================================
-- Pour rollback si besoin :
-- DROP TABLE IF EXISTS public.demo_leads CASCADE;
-- =============================================
