import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';

// Placeholder Pages - Will implement these next
import Hero from './components/home/Hero';
import TrustCards from './components/home/TrustCards';
import ServiceStructure from './components/home/ServiceStructure';
import ProcessFlow from './components/home/ProcessFlow';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <Hero />
      <TrustCards />
      <ServiceStructure />
      <ProcessFlow />
      <div className="container section-padding">
        <div className="text-center" style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>{t('cta.ready')}</h2>
          <Link to="/consultation" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}> {t('cta.apply')} </Link>
        </div>
      </div>
    </div>
  );
};

// Pages
import WorkCases from './pages/WorkCases';
import Scope from './pages/Scope';
import Method from './pages/Method';
import About from './pages/About';
import CaseDetail from './pages/CaseDetail';

// Placeholder for Consultation and Details
import Consultation from './pages/Consultation';
import AIPreview from './pages/AIPreview';
// Mobile Landing Page
import MobileLanding from './pages/MobileLanding';
import { useMobileRedirect } from './hooks/useMobileRedirect';

// Admin Pages
import Admin from './pages/Admin'; // Ensure Admin is imported if used
import AdminCase from './pages/AdminCase';

function App() {
  useMobileRedirect();

  return (
    <Routes>
      <Route path="/m" element={<MobileLanding />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cases" element={<WorkCases />} />
        <Route path="cases/:id" element={<CaseDetail />} />
        <Route path="scope" element={<Scope />} />
        <Route path="method" element={<Method />} />
        <Route path="about" element={<About />} />
        <Route path="consultation" element={<Consultation />} />
        <Route path="ai-preview" element={<AIPreview />} />

        {/* Admin Routes */}
        <Route path="admin" element={<Admin />} />
        <Route path="admin/cases" element={<AdminCase />} />
      </Route>
    </Routes>
  );
}

export default App;
