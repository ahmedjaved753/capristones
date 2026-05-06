import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NaturalStonePage from './pages/NaturalStonePage';
import QuartzPage from './pages/QuartzPage';
// Cabinets and Shower Panels are temporarily routed through ComingSoonPage (see routes below).
// The original page components are intentionally left imported so a 1-line restore is enough.
import ShowerPanelsPage from './pages/ShowerPanelsPage';
import ShowerPanelDetailPage from './pages/ShowerPanelDetailPage';
import CabinetsPage from './pages/CabinetsPage';
import CabinetDetailPage from './pages/CabinetDetailPage';
import ComingSoonPage from './pages/ComingSoonPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/natural-stone" element={<NaturalStonePage />} />
            <Route path="/natural-stone/:id" element={<ProductDetailPage />} />
            <Route path="/quartz" element={<QuartzPage />} />
            <Route path="/quartz/:id" element={<ProductDetailPage />} />
            {/* Shower Panels — temporarily shadowed by ComingSoonPage. To restore: swap element={<ComingSoonPage .../>} back to element={<ShowerPanelsPage />} / element={<ShowerPanelDetailPage />}. */}
            <Route path="/shower-panels" element={<ComingSoonPage category="Shower Panels" />} />
            <Route path="/shower-panels/:id" element={<ComingSoonPage category="Shower Panels" />} />
            {/* Cabinets — temporarily shadowed by ComingSoonPage. To restore: swap element={<ComingSoonPage .../>} back to element={<CabinetsPage />} / element={<CabinetDetailPage />}. */}
            <Route path="/cabinets" element={<ComingSoonPage category="Cabinets" />} />
            <Route path="/cabinets/:id" element={<ComingSoonPage category="Cabinets" />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
