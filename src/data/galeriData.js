// ============================================================
// DATA GALERI — MA FATHUS SALAFI
// ============================================================

export const KATEGORI_GALERI = [
  { id: 'semua', label: 'Semua Foto' },
  { id: 'belajar', label: 'Kegiatan Belajar' },
  { id: 'upacara', label: 'Upacara' },
  { id: 'maulid', label: 'Maulid' },
  { id: 'agustusan', label: 'Agustusan' },
  { id: 'pramuka', label: 'Pramuka' },
  { id: 'paskibra', label: 'Paskibra' },
  { id: 'osis', label: 'OSIS' },
  { id: 'lomba', label: 'Lomba' },
  { id: 'wisuda', label: 'Wisuda' },
];

// ============================================================
// DATA FOTO (placeholder — nanti bisa diganti dengan foto asli)
// ============================================================
export const FOTO_GALERI = [
  // === KEGIATAN BELAJAR ===
  { id: 1, kategori: 'belajar', judul: 'KBM Kelas XII Putra', tanggal: '10 September 2026', emoji: '📚', warna: 'from-blue-500 to-blue-700', tinggi: 'tall' },
  { id: 2, kategori: 'belajar', judul: 'Praktikum Biologi', tanggal: '8 September 2026', emoji: '🔬', warna: 'from-emerald-500 to-emerald-700', tinggi: 'normal' },
  { id: 3, kategori: 'belajar', judul: 'Diskusi Kelompok Fikih', tanggal: '5 September 2026', emoji: '📖', warna: 'from-indigo-500 to-indigo-700', tinggi: 'short' },
  { id: 4, kategori: 'belajar', judul: "Belajar Al-Qur'an", tanggal: '3 September 2026', emoji: '🕌', warna: 'from-cyan-500 to-teal-700', tinggi: 'normal' },

  // === UPACARA ===
  { id: 5, kategori: 'upacara', judul: 'Upacara Bendera Senin', tanggal: '9 September 2026', emoji: '🇮🇩', warna: 'from-red-500 to-red-700', tinggi: 'tall' },
  { id: 6, kategori: 'upacara', judul: 'Upacara HUT RI', tanggal: '17 Agustus 2026', emoji: '🎌', warna: 'from-rose-500 to-rose-700', tinggi: 'normal' },

  // === MAULID ===
  { id: 7, kategori: 'maulid', judul: 'Peringatan Maulid Nabi SAW', tanggal: '16 September 2026', emoji: '🌙', warna: 'from-amber-500 to-orange-600', tinggi: 'tall' },
  { id: 8, kategori: 'maulid', judul: 'Sholawat Bersama Santri', tanggal: '16 September 2026', emoji: '🎵', warna: 'from-yellow-500 to-amber-600', tinggi: 'normal' },

  // === AGUSTUSAN ===
  { id: 9, kategori: 'agustusan', judul: 'Lomba Tarik Tambang', tanggal: '17 Agustus 2026', emoji: '🎉', warna: 'from-red-500 to-pink-600', tinggi: 'normal' },
  { id: 10, kategori: 'agustusan', judul: 'Lomba Balap Karung', tanggal: '17 Agustus 2026', emoji: '🏃', warna: 'from-orange-500 to-red-600', tinggi: 'short' },

  // === PRAMUKA ===
  { id: 11, kategori: 'pramuka', judul: 'Perkemahan Pramuka Blok', tanggal: '2 September 2026', emoji: '⛺', warna: 'from-emerald-600 to-green-700', tinggi: 'tall' },
  { id: 12, kategori: 'pramuka', judul: 'Latihan Simpul & Tali', tanggal: '28 Agustus 2026', emoji: '🪢', warna: 'from-lime-600 to-emerald-700', tinggi: 'normal' },

  // === PASKIBRA ===
  { id: 13, kategori: 'paskibra', judul: 'Latihan Paskibra Kabupaten', tanggal: '12 Agustus 2026', emoji: '🎖️', warna: 'from-yellow-500 to-amber-600', tinggi: 'normal' },
  { id: 14, kategori: 'paskibra', judul: 'Pengukuhan Paskibra', tanggal: '15 Agustus 2026', emoji: '🏅', warna: 'from-amber-600 to-yellow-700', tinggi: 'short' },

  // === OSIS ===
  { id: 15, kategori: 'osis', judul: 'Pelantikan OSIS 2026/2027', tanggal: '20 Agustus 2026', emoji: '🎓', warna: 'from-indigo-500 to-purple-700', tinggi: 'tall' },
  { id: 16, kategori: 'osis', judul: 'Rapat Kerja OSIS', tanggal: '25 Agustus 2026', emoji: '📋', warna: 'from-violet-500 to-indigo-700', tinggi: 'normal' },

  // === LOMBA ===
  { id: 17, kategori: 'lomba', judul: 'Juara 1 MTQ Kabupaten', tanggal: '5 September 2026', emoji: '🏆', warna: 'from-rose-500 to-red-700', tinggi: 'tall' },
  { id: 18, kategori: 'lomba', judul: 'Lomba Pidato B. Arab', tanggal: '1 September 2026', emoji: '🎤', warna: 'from-pink-500 to-rose-700', tinggi: 'normal' },
  { id: 19, kategori: 'lomba', judul: 'Olimpiade Matematika', tanggal: '28 Agustus 2026', emoji: '🧮', warna: 'from-fuchsia-500 to-pink-700', tinggi: 'short' },

  // === WISUDA ===
  { id: 20, kategori: 'wisuda', judul: 'Wisuda Tahfidz Angkatan 2026', tanggal: '15 Juni 2026', emoji: '🎓', warna: 'from-teal-500 to-cyan-700', tinggi: 'tall' },
  { id: 21, kategori: 'wisuda', judul: 'Pelepasan Siswa Kelas XII', tanggal: '10 Juni 2026', emoji: '🎊', warna: 'from-cyan-500 to-teal-700', tinggi: 'normal' },
];

// Helper: filter foto berdasarkan kategori
export function getFotoByKategori(kategori) {
  if (kategori === 'semua') return FOTO_GALERI;
  return FOTO_GALERI.filter((f) => f.kategori === kategori);
}