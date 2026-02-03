import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import FeaturesPage from './routes/FeaturesPage';
import ForWhoPage from './routes/ForWhoPage';
import PricingPage from './routes/PricingPage';
import ContactPage from './routes/ContactPage';
import DemoPage from './routes/DemoPage';
import DemoBoardPage from './pages/_DemoBoardPage';
import EarlyBirdsPage from './routes/EarlyBirdsPage';

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
      </Routes>
    </Router>
  );
}

export default App;
