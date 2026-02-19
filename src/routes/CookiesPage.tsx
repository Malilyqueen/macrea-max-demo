import React from 'react'
import MainLayout from '../components/layout/MainLayout'
import { Link } from 'react-router-dom'

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/" className="inline-block text-sm text-[#0091ff] hover:underline">← Retour à l'accueil</Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">Politique Cookies</h1>

        <div className="prose max-w-none text-[#0f172a]">
          <p>Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.</p>

          <h2>Cookies essentiels</h2>
          <p>Ces cookies sont nécessaires pour le fonctionnement du site (authentification, sécurité, préférences liées à la session).</p>

          <h2>Cookies de performance et d'analyse</h2>
          <p>Nous utilisons des outils d'analyse (ex. Google Analytics) pour mesurer l'utilisation du site et améliorer nos services. Les données collectées sont agrégées et anonymisées lorsque c'est possible.</p>

          <h2>Cookies publicitaires</h2>
          <p>Nous pouvons utiliser des cookies tiers à des fins de publicité personnalisée. Vous pouvez vous opposer à ce suivi via les paramètres de votre navigateur ou les outils de gestion des cookies fournis sur le site.</p>

          <h2>Gestion des cookies</h2>
          <p>Vous pouvez configurer ou désactiver les cookies dans les paramètres de votre navigateur. La désactivation de certains cookies peut affecter la fonctionnalité du site.</p>

          <h2>Contact</h2>
          <p>Pour toute question relative aux cookies, contactez-nous à contact@malalacrea.fr.</p>
        </div>
      </div>
    </MainLayout>
  )
}

