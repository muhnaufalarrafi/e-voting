'use client';
import { useEffect, useState } from 'react';
import { hasilVoting } from '../../lib/api';

export default function MonitorVoting() {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    hasilVoting().then(data => setVotes(data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-800">📊 Monitor Voting</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">NIM</th>
              <th className="px-4 py-2">Prodi</th>
              <th className="px-4 py-2">Organisasi</th>
              <th className="px-4 py-2">ID Paslon</th>
              <th className="px-4 py-2">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {votes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">Belum ada voting</td>
              </tr>
            ) : (
              votes.map((v, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{v[0]}</td>
                  <td className="px-4 py-2">{v[1]}</td>
                  <td className="px-4 py-2">{v[2]}</td>
                  <td className="px-4 py-2">{v[3]}</td>
                  <td className="px-4 py-2">{v[4]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
