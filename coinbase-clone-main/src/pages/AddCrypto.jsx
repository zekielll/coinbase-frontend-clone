import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCrypto } from '../api';

const AddCrypto = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [change24h, setChange24h] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name || !symbol || !price || !change24h) {
      setError('Name, symbol, price, and 24h change are required.');
      return;
    }

    setLoading(true);
    try {
      await createCrypto({
        name,
        symbol,
        price: Number(price),
        image,
        change24h: Number(change24h),
      });
      setMessage('Crypto added successfully.');
      setName('');
      setSymbol('');
      setPrice('');
      setImage('');
      setChange24h('');
    } catch (err) {
      setError(err.message || 'Failed to add crypto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#2C2F36] bg-[#111318] p-8 shadow-xl">
        <button className="mb-6 text-sm text-[#66B2FF] hover:underline" onClick={() => navigate('/profile')}>
          ← Back to profile
        </button>
        <h1 className="text-3xl font-bold mb-4">Add a new cryptocurrency</h1>
        <p className="text-sm text-[#8A919E] mb-6">Use this form to create a new crypto entry in the backend database.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bitcoin"
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Symbol</span>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="BTC"
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Current price</span>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="34000"
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Image URL</span>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/coin.png"
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">24h Change</span>
            <input
              type="number"
              step="0.01"
              value={change24h}
              onChange={(e) => setChange24h(e.target.value)}
              placeholder="2.5"
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
            />
          </label>
          {error && <p className="text-sm text-[#FF7A7A]">{error}</p>}
          {message && <p className="text-sm text-[#76D7A4]">{message}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-[#0052FF] px-4 py-3 text-white text-sm font-semibold hover:bg-[#1a5cff] transition"
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Create crypto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrypto;
