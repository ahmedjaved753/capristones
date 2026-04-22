import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NaturalStonePage from './pages/NaturalStonePage';
import QuartzPage from './pages/QuartzPage';
import ShowerPanelsPage from './pages/ShowerPanelsPage';
import ShowerPanelDetailPage from './pages/ShowerPanelDetailPage';
import CabinetsPage from './pages/CabinetsPage';
import CabinetDetailPage from './pages/CabinetDetailPage';
import AppointmentsPage from './pages/AppointmentsPage';
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
            <Route path="/shower-panels" element={<ShowerPanelsPage />} />
            <Route path="/shower-panels/:id" element={<ShowerPanelDetailPage />} />
            <Route path="/cabinets" element={<CabinetsPage />} />
            <Route path="/cabinets/:id" element={<CabinetDetailPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
