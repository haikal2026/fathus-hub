import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await login(email, password);

    setLoading(false);
    if (error) {
      setError(error.message);
    } else if (onSuccess) {
      onSuccess();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAFC]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#0F4C81] flex items-center justify-center mb-4">
          <span className="text-white text-xl font-extrabold">MA</span>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900">
          Masuk FATHUS Hub
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Gunakan akun yang diberikan admin sekolah.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-[13px] font-bold">
            ⚠️ {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@mafathussalafi.sch.id"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-12 rounded-full bg-[#0F4C81] hover:bg-[#1E3A8A] disabled:bg-slate-300 text-white font-bold text-[14px] transition"
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </button>

        <div className="mt-4 text-center text-[11px] text-slate-400">
          Belum punya akun? Hubungi admin sekolah.
        </div>
      </form>
    </div>
  );
}