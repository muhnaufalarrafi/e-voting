// src\app\page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');

  const handleSubmit = () => {
    if (!nim || !prodi) return alert("Lengkapi data terlebih dahulu!");
    localStorage.setItem('nim', nim);
    localStorage.setItem('prodi', prodi);
    router.push('/voting');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Mulai Voting</h1>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">NIM</label>
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Contoh: 20210801046"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Pilih Prodi</label>
          <select
            value={prodi}
            onChange={(e) => setProdi(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Pilih Prodi --</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Mulai Voting
        </button>
      </div>
    </div>
  );
}
