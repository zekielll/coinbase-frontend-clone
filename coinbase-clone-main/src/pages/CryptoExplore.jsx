import Header from '../components/header';
import Footer from '../components/footer';
import CryptoTableBackend from '../components/CryptoTableBackend';

const CryptoExplore = () => {
  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-[#111318] p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]">
          <h1 className="text-4xl font-semibold mb-3">Explore crypto markets</h1>
          <p className="text-lg text-[#8A919E] max-w-2xl">Browse tradable coins, top gainers, and recently listed assets powered by the backend API.</p>
        </div>
        <CryptoTableBackend />
      </main>
      <Footer />
    </div>
  );
};

export default CryptoExplore;
