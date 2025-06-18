// src\app\voting\page.js
'use client';
import { useEffect, useState } from 'react';
import { getAllPaslon, vote } from '../lib/api';
import Image from 'next/image';

export default function Voting() {
  const [paslon, setPaslon] = useState([]);
  const [currentOrg, setCurrentOrg] = useState(0);
  const [voterData, setVoterData] = useState({ nim: '', prodi: '' });

  const organisasi = voterData.prodi === "Teknik Informatika"
    ? ['DPMF', 'BEMF', 'HIMASTIKA']
    : ['DPMF', 'BEMF', 'HUMANIS'];

  useEffect(() => {
    const nim = localStorage.getItem('nim');
    const prodi = localStorage.getItem('prodi');
    setVoterData({ nim, prodi });

    getAllPaslon().then(data => {
      setPaslon(data);
    });
  }, []);

  const handleVote = (paslonId) => {
    if (!voterData.nim || !voterData.prodi) {
      alert("Data pemilih tidak ditemukan, silakan login ulang.");
      return;
    }
    
    vote(voterData.nim, voterData.prodi, organisasi[currentOrg], paslonId).then(() => {
      if (currentOrg < organisasi.length - 1) {
        setCurrentOrg(currentOrg + 1);
      } else {
        alert("Terima kasih telah memberikan suara!");
        localStorage.clear();
        window.location.href = '/';
      }
    });
  };

  const filteredPaslon = paslon.filter(p => p.organisasi === organisasi[currentOrg]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Pilih Paslon untuk Organisasi: <span className="text-blue-600">{organisasi[currentOrg]}</span>
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredPaslon.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                  {p.ketua} & {p.wakil}
                </h3>
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                  {/* Bagian Ketua */}
                  <div className="flex-1 text-center">
                    {p.url_ketua && (
                      // DIPERBAIKI: h-auto menjadi h-48
                        <Image 
                            src={p.url_ketua} 
                            alt={`Foto ${p.ketua}`} 
                            width={200} 
                            height={200} 
                            // DIUBAH: w-full menjadi w-48 agar ukurannya kotak (48x48 unit)
                            className="w-48 h-48 object-cover rounded-lg mx-auto shadow-md" 
                          />
                    )}
                    <p className="text-md mt-2 font-semibold text-gray-700">{p.ketua}</p>
                    <p className="text-sm text-gray-500">Calon Ketua</p>
                  </div>
                  {/* Bagian Wakil */}
                  <div className="flex-1 text-center">
                    {p.url_wakil && (
                      // DIPERBAIKI: h-auto menjadi h-48
                        <Image 
                          src={p.url_wakil } 
                          alt={`Foto ${p.wakil}`} 
                          width={200} 
                          height={200} 
                          // DIUBAH: w-full menjadi w-48 agar ukurannya kotak (48x48 unit)
                          className="w-48 h-48 object-cover rounded-lg mx-auto shadow-md" 
                        />
                    )}
                    <p className="text-md mt-2 font-semibold text-gray-700">{p.wakil}</p>
                    <p className="text-sm text-gray-500">Calon Wakil</p>
                  </div>
                </div>
                <div className="text-left mt-4 border-t pt-4">
                  <p className="text-sm mb-1"><span className="font-semibold">Visi:</span> {p.visi}</p>
                  <p className="text-sm mb-4 whitespace-pre-line"><span className="font-semibold">Misi:</span> {p.misi}</p>
                </div>
                <button
                  onClick={() => handleVote(p.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition text-lg"
                >
                  Pilih Paslon Ini
                </button>
              </div>
            </div>
          ))}
        </div>

        {paslon.length > 0 && filteredPaslon.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Tidak ada paslon untuk organisasi ini.</p>
        )}
      </div>
    </div>
  );
}