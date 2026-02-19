import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import FeaturesPage from './routes/FeaturesPage';
import ForWhoPage from './routes/ForWhoPage';
import PricingPage from './routes/PricingPage';
import ContactPage from './routes/ContactPage';
import DemoPage from './routes/DemoPage';
import DemoBoardPage from './pages/_DemoBoardPage';
import EarlyBirdsPage from './routes/EarlyBirdsPage';
import MentionsLegalesPage from './routes/MentionsLegalesPage';
import PrivacyPolicyPage from './routes/PrivacyPolicyPage';
import CgvPage from './routes/CgvPage';
import CguPage from './routes/CguPage';
import CookiesPage from './routes/CookiesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fonctionnalites" element={<FeaturesPage />} />
        <Route path="/pour-qui" element={<ForWhoPage />} />
        <Route path="/tarifs" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/demoboard" element={<DemoBoardPage />} />
        <Route path="/early-birds" element={<EarlyBirdsPage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/confidentialite" element={<PrivacyPolicyPage />} />
        <Route path="/cgv" element={<CgvPage />} />
        <Route path="/cgu" element={<CguPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
