import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import ProjectNoticeBanner from './components/ui/ProjectNoticeBanner';
import HeroSection from './components/sections/HeroSection';
import ExploreCryptoSection from './components/sections/ExploreCryptoSection';
import AdvancedTraderSection from './components/sections/AdvancedTraderSection';
import BaseAppSection from './components/sections/BaseAppSection';
import LearnSection from './components/sections/LearnSection';
import TakeControlSection from './components/sections/TakeControlSection';
import SignIn from './pages/SignIn';
import AccountTypeSelect from './pages/AccountTypeSelect';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import CryptoExplore from './pages/CryptoExplore';
import MarketStatsPage from './pages/MarketStatsPage';
import LearnPage from './pages/LearnPage';
import CryptoBasicsPage from './pages/CryptoBasicsPage';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddCrypto from './pages/AddCrypto';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/ui/Loader';

const Home = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <ExploreCryptoSection />
      <AdvancedTraderSection />
      <BaseAppSection />
      <LearnSection />
      <TakeControlSection />
    </main>
    <Footer />
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <ProjectNoticeBanner />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<CryptoExplore />} />
      <Route path="/market-stats" element={<MarketStatsPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/account-type" element={<AccountTypeSelect />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/add-crypto" element={
        <ProtectedRoute>
          <AddCrypto />
        </ProtectedRoute>
      } />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/learn/crypto-basics" element={<CryptoBasicsPage />} />
    </Routes>
    </>
  );
};

export default App;
