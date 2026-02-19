import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import { Link } from 'react-router-dom'

export default function MentionsLegalesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="inline-block text-sm text-[#0091ff] hover:underline">← Retour à l'accueil</Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">Mentions légales</h1>

        <section className="prose max-w-none text-[#0f172a]">
          <h2>Éditeur du site et du logiciel MAX</h2>
          <p>MACREA — Micro Entreprise</p>
          <p>Siège social : Rue Jean Pierre Timbaud 92400</p>
          <p>Email : contact@malalacrea.fr</p>
          <p>Directrice de la publication : Malala Ramaha</p>

          <h2>Hébergement</h2>
          <p>Le site et l’application MAX sont hébergés par :</p>
          <ul>
            <li>Scaleway SAS – 8 rue de la Ville l'Évêque, 75008 Paris</li>
            <li>Vercel Inc. – USA</li>
            <li>Supabase Inc. – USA</li>
          </ul>

          <h2>Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments présents sur le site et dans l’application MAX (textes,
            logos, design, structure, code, concept, fonctionnalités) est protégé par le droit de
            la propriété intellectuelle. Toute reproduction, modification ou exploitation sans
            autorisation écrite est interdite.
          </p>
        </section>
      </div>
    </MainLayout>
  )
}
