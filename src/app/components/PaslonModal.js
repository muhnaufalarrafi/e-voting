// src\app\components\PaslonModal.js
'use client';
import { useState } from 'react';

export default function PaslonModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    organisasi: '',
    ketua: '',
    wakil: '',
    visi: '',
    misi: '',
  });
  const [imageKetua, setImageKetua] = useState(null);
  const [imageWakil, setImageWakil] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e, role) => {
    const file = e.target.files[0];
    if (role === 'ketua') setImageKetua(file);
    else setImageWakil(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!form.ketua || !form.wakil || !imageKetua || !imageWakil) {
      alert('Lengkapi semua data');
      return;
    }

    const base64Ketua = await convertToBase64(imageKetua);
    const base64Wakil = await convertToBase64(imageWakil);

    setIsLoading(true);

    await onSubmit({
      data: form,
      imageKetua: base64Ketua,
      imageWakil: base64Wakil,
    });

    setIsLoading(false);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500">&times;</button>
        <h2 className="text-lg font-bold mb-4 text-gray-800">Tambah Paslon</h2>

        <div className="space-y-3">
          <select name="organisasi" value={form.organisasi} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="">Pilih Organisasi</option>
            <option>DPMF</option>
            <option>BEMF</option>
            <option>HIMASTIKA</option>
            <option>HUMANIS</option>
          </select>

          <input name="ketua" placeholder="Nama Calon Ketua" value={form.ketua} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="file" onChange={(e) => handleFile(e, 'ketua')} className="w-full" />

          <input name="wakil" placeholder="Nama Calon Wakil Ketua" value={form.wakil} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="file" onChange={(e) => handleFile(e, 'wakil')} className="w-full" />

          <textarea name="visi" placeholder="Visi" value={form.visi} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <textarea name="misi" placeholder="Misi" value={form.misi} onChange={handleChange} className="w-full border px-3 py-2 rounded" />

            <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
            >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
        </div>
      </div>
    </div>
  );
}
