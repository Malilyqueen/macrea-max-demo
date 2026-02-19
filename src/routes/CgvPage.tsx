import React from 'react'
import React from 'react'
import LegalLayout from '../components/layout/LegalLayout'

export default function CgvPage() {
  return (
    <LegalLayout>
      <h1 className="text-2xl font-bold mb-4">Conditions Générales de Vente (CGV)</h1>

      <h2 id="objet">1. Objet</h2>
      <p>Les présentes Conditions Générales de Vente régissent l’abonnement au logiciel MAX édité par MACREA. MAX est un logiciel SaaS permettant la gestion de contacts, l’automatisation marketing (email, SMS, WhatsApp) et l’assistance IA.</p>

      <h2 id="abonnement">2. Abonnement</h2>
      <p>L’accès au service est proposé sous forme d’abonnement mensuel ou annuel. L’abonnement est payable d’avance. Tout mois commencé est dû.</p>

      <h2 id="prix">3. Prix</h2>
      <p>Les prix sont indiqués en euros HT ou TTC selon le statut du client. MACREA se réserve le droit de modifier ses tarifs. Toute modification n’affectera pas les abonnements en cours jusqu’à leur renouvellement.</p>

      <h2 id="paiement">4. Paiement</h2>
      <p>Le paiement est effectué via PayPal ou tout autre prestataire indiqué. En cas d’échec de paiement, l’accès au service peut être suspendu.</p>

      <h2 id="acces">5. Accès au service</h2>
      <p>MACREA s’engage à mettre en œuvre tous les moyens raisonnables pour assurer l’accès au service. Cependant, l’éditeur ne peut garantir une disponibilité continue sans interruption.</p>

      <h2 id="responsabilite">6. Responsabilité</h2>
      <p>MAX est un outil d’assistance marketing. MACREA ne garantit aucun résultat commercial. L’utilisateur reste seul responsable du contenu de ses campagnes, du respect des lois anti-spam et des données importées.</p>

      <h2 id="resiliation">7. Résiliation</h2>
      <p>L’utilisateur peut résilier son abonnement à tout moment. La résiliation prend effet à la fin de la période en cours. Aucun remboursement prorata temporis n’est effectué.</p>

      <h2 id="suspension">8. Suspension</h2>
      <p>MACREA peut suspendre un compte en cas d’usage frauduleux, de spam massif ou de violation des présentes conditions.</p>
    </LegalLayout>
  )
}
