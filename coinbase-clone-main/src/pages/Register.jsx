import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-md bg-[#111318] rounded-3xl border border-[#2C2F36] p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Create your Coinbase account</h1>
        <p className="text-sm text-[#8A919E] mb-6">Register with your name, email, and password to access your dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
              placeholder="Your full name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-[#E4E7EC]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#2C2F36] bg-[#0F1217] px-4 py-3 text-white outline-none focus:border-[#0052FF]"
              placeholder="Create a password"
            />
          </label>
          {error && <p className="text-sm text-[#FF7A7A]">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-[#0052FF] px-4 py-3 text-white text-sm font-semibold hover:bg-[#1a5cff] transition"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-sm text-[#8A919E]">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#66B2FF] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
