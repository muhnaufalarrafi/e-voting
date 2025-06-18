'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { adminLogin } from '../lib/api'; // Menggunakan path relatif atau alias '@'

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username dan password harus diisi.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await adminLogin(username, password);
      if (res.authenticated) {
        // Jika berhasil, arahkan ke dashboard
        router.push('/admin/dashboard');
      } else {
        setError("Login gagal. Periksa kembali username dan password Anda.");
      }
    } catch (err) {
      setError("Terjadi error pada server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Admin</h1>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username admin"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:bg-blue-400"
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </div>
    </div>
  );
}