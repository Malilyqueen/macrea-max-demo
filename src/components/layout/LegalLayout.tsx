import React, { ReactNode, useEffect, useState } from 'react'
import MainLayout from './MainLayout'
import { Link } from 'react-router-dom'

interface TocItem { id: string; title: string }

export default function LegalLayout({ children }: { children: ReactNode }) {
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    // Build TOC from h2 elements within #legal-content
    try {
      const container = document.getElementById('legal-content')
      if (!container) return
      const els = Array.from(container.querySelectorAll('h2'))
      const items = els.map((h) => {
        if (!h.id) {
          // create slug id
          const slug = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `section-${Math.random().toString(36).slice(2,7)}`
          h.id = slug
        }
        return { id: h.id, title: h.textContent || '' }
      })
      setToc(items)
    } catch (e) {
      // noop
    }
  }, [])

  const handlePrint = () => {
    try { window.print() } catch {}
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <Link to="/" className="inline-block text-sm text-[#0091ff] hover:underline">← Retour à l'accueil</Link>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handlePrint} className="text-sm px-3 py-1 rounded-md border border-[rgba(0,145,255,0.08)] hover:bg-white/50">Imprimer</button>
                <Link to="/cookies" className="text-sm px-3 py-1 rounded-md text-[#0091ff] hover:underline">Gérer les cookies</Link>
              </div>
            </div>

            <div id="legal-content" className="bg-white rounded-2xl border border-[rgba(0,145,255,0.12)] p-6 prose max-w-none text-[#0f172a]">
              {children}
            </div>
          </div>

          <aside className="hidden md:block w-64">
            <div className="sticky top-24">
              <div className="text-sm font-semibold text-[#0091ff] mb-3">Sommaire</div>
              <ul className="space-y-2 text-[#64748b]">
                {toc.length === 0 && <li className="text-xs">Aucun sommaire disponible</li>}
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="hover:text-[#00cfff] transition-colors">{t.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  )
}
