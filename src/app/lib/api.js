// src\app\lib\api.js

// URL sekarang dibaca dari environment variable, lebih aman dan fleksibel
const API_URL = process.env.NEXT_PUBLIC_API_URL;
/**
 * Helper universal untuk POST request ke Apps Script.
 */
async function postToScript(action, body = {}) {
  try {
    const res = await fetch(`${API_URL}?action=${action}`, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        // DIPERBAIKI: Kembali ke standar yang benar, karena proxy sudah menangani CORS
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), 
    });

    if (!res.ok) {
      try {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Unknown error');
      } catch {
        throw new Error(await res.text());
      }
    }
    
    return res.json();
  } catch (err) {
    console.error(`Error pada action "${action}":`, err.message);
    throw err;
  }
}

// ==========================================================
// Semua fungsi di bawah ini tidak perlu diubah, karena
// mereka sudah menggunakan helper postToScript yang baru saja kita perbaiki.
// ==========================================================

/**
 * Validasi pengguna berdasarkan NIM, Prodi, dan Organisasi.
 */
export function validateUser(nim, prodi, organisasi) {
  return postToScript('validate', { nim, prodi, organisasi });
}

/**
 * Ambil seluruh data paslon.
 */
export async function getAllPaslon() {
  const res = await fetch(API_URL, { method: 'GET', mode: 'cors' });
  if (!res.ok) throw new Error('Gagal mengambil data paslon.');
  return res.json();
}

/**
 * Submit suara voting.
 */
export function vote(nim, prodi, organisasi, paslonId) {
  return postToScript('vote', { nim, prodi, organisasi, paslonId });
}

/**
 * Autentikasi login admin.
 */
export function adminLogin(username, password) {
  return postToScript('adminLogin', { username, password });
}

/**
 * Ambil hasil rekap voting.
 */
export function hasilVoting() {
  return postToScript('hasilVoting', {});
}

/**
 * Tambah paslon lengkap dengan gambar base64 (ketua & wakil).
 */
export function addPaslon(data, imageKetuaBase64, imageWakilBase64) {
  return postToScript('addPaslon', {
    data,
    imageKetua: imageKetuaBase64,
    imageWakil: imageWakilBase64,
  });
}

export function deletePaslon(id) {
  // Kita belum membuat action 'deletePaslon' di Code.gs,
  // tapi kita siapkan dulu di sini.
  // Untuk sementara, kita akan buat action-nya nanti.
  // Mari kita asumsikan namanya 'deletePaslon'.
  // NOTE: Anda perlu menambahkan case 'deletePaslon' di Code.gs
  // yang memanggil fungsi deletePaslon(payload.id) dari paslon.gs
  
  // Untuk sekarang, kita akan buat panggilannya.
  // Anda perlu menambahkan 'case deletePaslon' di doPost di Code.gs
  return postToScript('deletePaslon', { id: id });
}
