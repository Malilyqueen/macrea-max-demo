Voici exactement **ce que Copilot doit faire en premier**, maintenant qu’il a pris connaissance des documents du projet **macrea-max-landing** et de la vision globale.

Je te donne une réponse **claire, opérationnelle, et prête à coller dans Copilot** si tu veux.
C’est l’étape 1 du chantier.

---

# ✅ **Étape n°1 pour Copilot : Initialiser la structure du projet + créer les fichiers de base**

Avant toute mise en page, avant les scénarios, avant la démo, il doit **poser l’architecture du projet**.
C’est l'étape qui rend tout le reste simple et propre.

Copilot doit faire ceci :

---

# 🧱 **1. Créer la structure du projet (React + Vite + Tailwind)**

Copilot doit :

* Vérifier que Tailwind est bien configuré
* Vérifier que le routing est en place
* Créer l’arborescence suivante :

```
src/
  routes/
    HomePage.tsx
    FeaturesPage.tsx
    ForWhoPage.tsx
    PricingPage.tsx
    ContactPage.tsx
    DemoPage.tsx

  components/
    layout/
      MainLayout.tsx
      Header.tsx
      Footer.tsx
      SidebarDemo.tsx

    hero/
      MaxHeroSection.tsx

    demo/
      MaxDemoLayout.tsx
      MaxDemoChat.tsx
      ScenarioSelector.tsx
      ScenarioProgress.tsx

  demo/
    scenarios.ts
```

C’est **LE socle** qui permettra :

* d’afficher la landing
* d’intégrer la mascotte MAX
* de créer la démo interactive
* d’avoir un code propre et scalable

---

# 🎨 **2. Générer les fichiers vides (squelettes)**

Copilot doit créer des composants **vides mais prêts**, sans contenu :

Exemples :

```tsx
export default function HomePage() {
  return (
    <MainLayout>
      <MaxHeroSection />
    </MainLayout>
  );
}
```

```tsx
export default function MaxHeroSection() {
  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center">
      {/* Image MAX + titre + CTA ici */}
    </section>
  );
}
```

```tsx
export default function DemoPage() {
  return <MaxDemoLayout />;
}
```

Copilot ne met **pas encore** :

* les textes marketing
* les animations
* les scénarios
* la logique du chat

👉 Il doit juste **structurer**.

---

# 🧠 **3. Ajouter le fichier des scénarios de démo**

Copilot doit créer :

`src/demo/scenarios.ts`

Avec les types + un exemple de scénario vide.

Ça garantit que le jour où tu ajoutes les scénarios réels, tout se “branche” sans casser.

---

# 🔗 **4. Activer la navigation entre les pages**

Copilot doit configurer `react-router-dom` :

* `/` → HomePage
* `/fonctionnalites` → FeaturesPage
* `/pour-qui` → ForWhoPage
* `/tarifs` → PricingPage
* `/contact` → ContactPage
* `/demo` → DemoPage

Ainsi, la structure est prête pour le contenu.

---

# 🧩 **5. Ajouter les images MAX dans src/assets**

Copilot doit préparer :

```
src/assets/max/
  max-hero-happy.png
  max-hero-thinking.png
  max-hero-guide.png
```

Il ne met pas le contenu (les images), mais il crée les dossiers pour que toi, tu glisses les fichiers.

---

# 🚀 Résultat attendu après l’étape 1

Une fois Copilot terminé :

* Le projet compile.
* Les pages sont là.
* La navigation fonctionne.
* Les composants existent.
* Les images sont prêtes.
* La démo a son architecture.

**Même si tout est vide, la maison est construite.
On peut commencer la décoration.**

---

# 📌 Phrase prête à coller dans Copilot

Tu peux littéralement lui dire :

---

**➤ Instruction Copilot :**

> Copilot, commence par créer toute l’architecture du projet macrea-max-landing.
>
> 1. Génère les routes : HomePage, FeaturesPage, ForWhoPage, PricingPage, ContactPage, DemoPage.
> 2. Crée les composants vides : MaxHeroSection, MainLayout, Header, Footer, SidebarDemo, MaxDemoLayout, MaxDemoChat, ScenarioSelector, ScenarioProgress.
> 3. Mets en place react-router-dom pour la navigation.
> 4. Crée le dossier src/assets/max/ pour les images.
> 5. Crée le fichier src/demo/scenarios.ts avec les types et un exemple de scénario vide.
> 6. Ne mets pas encore le texte marketing ni la logique du chat : l’objectif est d’avoir une structure propre, vide, compilable.
>
> Une fois cette structure en place, je te dirai quoi mettre à l’intérieur.

---

Si tu veux ensuite la **phase 2 → intégrer les scénarios dans la démo**, je te la prépare aussi.
