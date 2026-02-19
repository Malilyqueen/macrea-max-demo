import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>

      <div className="prose max-w-none">
        <p>L'entreprise attache une grande importance à la protection des données personnelles.</p>

        <h2>1. Données collectées</h2>
        <p>Nous collectons les données suivantes : nom et prénom, adresse email, nom d’entreprise, numéro de téléphone, données importées par les utilisateurs dans leur CRM, données de connexion et d’usage, données de facturation.</p>

        <h2>2. Finalités du traitement</h2>
        <p>Les données sont utilisées pour : créer et gérer les comptes utilisateurs, fournir les fonctionnalités CRM et IA, permettre l’envoi d’emails, SMS et messages WhatsApp, assurer le support client, gérer les abonnements et paiements, garantir la sécurité du système.</p>

        <h2>3. Base légale</h2>
        <p>Les traitements reposent sur l’exécution du contrat (abonnement MAX), l’intérêt légitime (sécurité, amélioration du service) et le consentement lorsque requis.</p>

        <h2>4. Données des prospects importés</h2>
        <p>Les utilisateurs de MAX sont responsables des données qu’ils importent dans l’application. MACREA agit en qualité de sous-traitant technique pour ces données. L’utilisateur garantit disposer des autorisations nécessaires pour traiter les données de ses prospects.</p>

        <h2>5. Durée de conservation</h2>
        <p>Données utilisateur : durée de l’abonnement. Données de facturation : selon obligations légales. Données techniques : durée raisonnable de sécurité.</p>

        <h2>6. Sous-traitants techniques</h2>
        <p>Nous utilisons des prestataires pour assurer le fonctionnement du service : Supabase, Scaleway, Vercel, Mailjet, OVH (SMS), PayPal. Certains prestataires peuvent être situés hors Union Européenne.</p>

        <h2>7. Sécurité</h2>
        <p>MAX met en œuvre des mesures de sécurité techniques : isolation des comptes, règles d’accès aux données, chiffrement des informations sensibles, journalisation des accès.</p>

        <h2>8. Droits des utilisateurs</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants : accès, rectification, suppression, opposition, portabilité. Pour exercer vos droits : contact@malalacrea.fr. Vous pouvez également déposer une réclamation auprès de la CNIL.</p>
      </div>
    </div>
  )
}
