// src\app\admin\dashboard\page.js

'use client';
import { useEffect, useState, Fragment } from 'react';
// Sesuaikan path import jika Anda sudah menggunakan alias '@'
import { getAllPaslon, addPaslon, deletePaslon } from '../../lib/api';
import PaslonModal from '../../components/PaslonModal';
import Image from 'next/image';

// Ikon Trash SVG untuk tombol Hapus
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function Dashboard() {
  const [paslon, setPaslon] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // State untuk loading hapus

  const fetchPaslon = () => {
    setLoading(true);
    getAllPaslon().then(data => {
      setPaslon(data);
      setLoading(false);
    }).catch(err => {
      console.error("Gagal memuat data paslon:", err);
      setLoading(false);
    });
  };
  
  useEffect(() => {
    fetchPaslon();
  }, []);

  const handleSubmitPaslon = async (payload) => {
    try {
      await addPaslon(payload.data, payload.imageKetua, payload.imageWakil);
      fetchPaslon(); // Muat ulang data setelah paslon baru ditambahkan
      setShowModal(false); // Tutup modal setelah berhasil
    } catch (error) {
      alert("Gagal menambahkan paslon: " + error.message);
    }
  };

  const handleDelete = async (id, namaKetua) => {
    if (confirm(`Apakah Anda yakin ingin menghapus paslon "${namaKetua}"?`)) {
      setDeletingId(id); // Set id yang sedang dihapus untuk menampilkan loading
      try {
        await deletePaslon(id);
        // Hapus paslon dari state secara langsung untuk respons UI yang cepat
        setPaslon(currentPaslon => currentPaslon.filter(p => p.id !== id));
      } catch (error) {
        alert("Gagal menghapus paslon: " + error.message);
      } finally {
        setDeletingId(null); // Hapus status loading
      }
    }
  };

  return (
    <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Manajemen Paslon</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
        >
          + Tambah Paslon
        </button>
      </div>

      {loading ? (
        <p className="text-center text-slate-500">Memuat data paslon...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paslon.map((p, index) => (
            <div key={p.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{p.ketua} & {p.wakil}</h3>
                  <button 
                    onClick={() => handleDelete(p.id, p.ketua)} 
                    disabled={deletingId === p.id}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50"
                    title="Hapus Paslon"
                  >
                    {deletingId === p.id ? '...': <TrashIcon />}
                  </button>
                </div>
                
                <p className="text-sm font-semibold text-blue-600 mb-3">{p.organisasi}</p>
                
                <div className="flex gap-4 justify-center mb-4">
                  {p.url_ketua && (
                    <Image src={p.url_ketua} width={100} height={100} className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-md" alt={`Foto ${p.ketua}`} priority={index < 3} />
                  )}
                  {p.url_wakil && (
                    <Image src={p.url_wakil} width={100} height={100} className="w-24 h-24 object-cover rounded-full border-2 border-white shadow-md" alt={`Foto ${p.wakil}`} priority={index < 3} />
                  )}
                </div>
                
                <div className="text-sm text-slate-700 space-y-2">
                  <div>
                    <p className="font-semibold text-slate-800">Visi:</p>
                    <p className="text-slate-600">{p.visi}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Misi:</p>
                    <p className="text-slate-600 whitespace-pre-line">{p.misi}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <PaslonModal onClose={() => setShowModal(false)} onSubmit={handleSubmitPaslon} />
      )}
    </div>
  );
}