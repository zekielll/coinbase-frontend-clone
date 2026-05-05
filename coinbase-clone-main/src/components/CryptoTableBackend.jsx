import { useEffect, useState } from 'react';
import { getCryptos } from '../api';

const tabs = ['Tradable', 'Top gainers', 'New on Coinbase'];
const typeMap = {
  Tradable: 'all',
  'Top gainers': 'gainers',
  'New on Coinbase': 'new',
};

const CurrencyBadge = ({ value }) => (
  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
    {value}
  </span>
);

const CryptoTableBackend = () => {
  const [activeTab, setActiveTab] = useState('Tradable');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const fetchIt = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getCryptos(typeMap[activeTab]);
        if (active) setAssets(res.data || []);
      } catch (err) {
        if (active) setError(err.message || 'Unable to fetch crypto data.');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchIt();
    return () => { active = false; };
  }, [activeTab]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#0F1217] p-6 shadow-[0_35px_120px_-40px_rgba(0,0,0,0.65)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Market overview</h2>
          <p className="text-sm text-[#8A919E] mt-1">Live crypto data from the backend API.</p>
        </div>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? 'bg-white text-black' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-[#211D2E] p-6 text-sm text-[#FF7A7A]">{error}</div>
      ) : assets.length === 0 ? (
        <div className="rounded-2xl bg-[#211D2E] p-6 text-sm text-[#8A919E]">No cryptocurrencies found.</div>
      ) : (
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset._id || asset.symbol} className="flex flex-col gap-2 rounded-3xl border border-white/10 bg-[#15191F] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={asset.image || `https://placehold.co/40x40/111827/ffffff?text=${asset.symbol?.slice(0, 2)}`}
                  alt={asset.name}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/40x40/111827/ffffff?text=${asset.symbol?.slice(0, 2)}`; }}
                />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-white">{asset.name}</p>
                  <p className="truncate text-sm text-[#8A919E]">{asset.symbol}</p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 sm:items-center sm:text-right">
                <div>
                  <p className="text-sm text-[#8A919E]">Price</p>
                  <p className="text-lg font-semibold text-white">${asset.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-sm text-[#8A919E]">24h Change</p>
                  <p className={`text-lg font-semibold ${asset.change24h >= 0 ? 'text-[#5AD07A]' : 'text-[#FF7A7A]'}`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h?.toFixed(2)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#8A919E]">Listing date</p>
                  <p className="text-sm text-white/80">{new Date(asset.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoTableBackend;
