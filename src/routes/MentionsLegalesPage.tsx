import React from 'react'
import React from 'react'
import LegalLayout from '../components/layout/LegalLayout'

export default function MentionsLegalesPage() {
  return (
    <LegalLayout>
      <h1 className="text-2xl font-bold mb-4">Mentions légales</h1>

      <h2 id="editeur">Éditeur du site et du logiciel MAX</h2>
      <p>MACREA — Micro Entreprise</p>
      <p>Siège social : Rue Jean Pierre Timbaud 92400</p>
      <p>Email : contact@malalacrea.fr</p>
      <p>Directrice de la publication : Malala Ramaha</p>

      <h2 id="hebergement">Hébergement</h2>
      <p>Le site et l’application MAX sont hébergés par :</p>
      <ul>
        <li>Scaleway SAS – 8 rue de la Ville l'Évêque, 75008 Paris</li>
        <li>Vercel Inc. – USA</li>
        <li>Supabase Inc. – USA</li>
      </ul>

      <h2 id="propriete">Propriété intellectuelle</h2>
      <p>
        L’ensemble des éléments présents sur le site et dans l’application MAX (textes,
        logos, design, structure, code, concept, fonctionnalités) est protégé par le droit de
        la propriété intellectuelle. Toute reproduction, modification ou exploitation sans
        autorisation écrite est interdite.
      </p>
    </LegalLayout>
  )
}
