import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        navigate('/signin');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/signin');
    } catch (err) {
      setError(err.message || 'Logout failed.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center text-white">Loading profile…</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-white px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#2C2F36] bg-[#111318] p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Your profile</h1>
        {error && <p className="text-sm text-[#FF7A7A] mb-4">{error}</p>}
        {user ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#2C2F36] bg-[#0F1217] p-6">
                <p className="text-sm text-[#8A919E] mb-2">Name</p>
                <p className="text-lg text-white font-semibold">{user.name}</p>
              </div>
              <div className="rounded-3xl border border-[#2C2F36] bg-[#0F1217] p-6">
                <p className="text-sm text-[#8A919E] mb-2">Email</p>
                <p className="text-lg text-white font-semibold">{user.email}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-[#2C2F36] bg-[#0F1217] p-6">
              <p className="text-sm text-[#8A919E] mb-2">Member since</p>
              <p className="text-lg text-white font-semibold">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-full bg-[#FF5A5A] px-4 py-3 text-white text-sm font-semibold hover:bg-[#ff4242] transition"
            >
              Log out
            </button>
          </div>
        ) : (
          <p className="text-sm text-[#8A919E]">Unable to load profile information.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
