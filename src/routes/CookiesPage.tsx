import React from 'react'
import React from 'react'
import LegalLayout from '../components/layout/LegalLayout'

export default function CookiesPage() {
  return (
    <LegalLayout>
      <h1 className="text-2xl font-bold mb-4">Politique Cookies</h1>

      <h2 id="essentiels">Cookies essentiels</h2>
      <p>Ces cookies sont nécessaires pour le fonctionnement du site (authentification, sécurité, préférences liées à la session).</p>

      <h2 id="performance">Cookies de performance et d'analyse</h2>
      <p>Nous utilisons des outils d'analyse (ex. Google Analytics) pour mesurer l'utilisation du site et améliorer nos services. Les données collectées sont agrégées et anonymisées lorsque c'est possible.</p>

      <h2 id="publicitaires">Cookies publicitaires</h2>
      <p>Nous pouvons utiliser des cookies tiers à des fins de publicité personnalisée. Vous pouvez vous opposer à ce suivi via les paramètres de votre navigateur ou les outils de gestion des cookies fournis sur le site.</p>

      <h2 id="gestion">Gestion des cookies</h2>
      <p>Vous pouvez configurer ou désactiver les cookies dans les paramètres de votre navigateur. La désactivation de certains cookies peut affecter la fonctionnalité du site.</p>

      <h2 id="contact">Contact</h2>
      <p>Pour toute question relative aux cookies, contactez-nous à contact@malalacrea.fr.</p>
    </LegalLayout>
  )
}

