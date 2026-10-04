// ============================================================
// Struktur Submenu FATHUS School Hub
// Setiap menu utama punya submenu sendiri
// ============================================================

export const MENU_DATA = {
  profil: {
    label: 'Profil',
    icon: 'Building2',
    submenus: [
      { id: 'tentang', label: 'Tentang Sekolah' },
      { id: 'sejarah', label: 'Sejarah' },
      { id: 'visi', label: 'Visi & Misi' },
      { id: 'guru', label: 'Data Guru & Tendik' },
      { id: 'siswa', label: 'Data Siswa' },
      { id: 'fasilitas', label: 'Fasilitas' },
      { id: 'lingkungan', label: 'Lingkungan Sekolah' },
    ],
  },
  akademik: {
    label: 'Akademik',
    icon: 'BookOpen',
    submenus: [
     { id: 'dashboard', label: 'Dashboard Akademik' },
      { id: 'jadwal', label: 'Jadwal Pelajaran' },
      { id: 'mapel', label: 'Mata Pelajaran' },
      { id: 'ujian', label: 'Jadwal Ujian' },
    ],
  },
  kesiswaan: {
    label: 'Kesiswaan',
    icon: 'Users',
    submenus: [
      { id: 'data', label: 'Data Siswa' },
      { id: 'absensi', label: 'Absensi Digital' },
      { id: 'organisasi', label: 'Organisasi' },
      { id: 'ekskul', label: 'Ekstrakurikuler' },
      { id: 'prestasi', label: 'Prestasi' },
    ],
  },
  informasi: {
    label: 'Informasi',
    icon: 'Megaphone',
    submenus: [
      { id: 'pengumuman', label: 'Pengumuman' },
      { id: 'berita', label: 'Berita Sekolah' },
      { id: 'agenda', label: 'Agenda' },
      { id: 'kalender', label: 'Kalender Kegiatan' },
    ],
  },
  galeri: {
    label: 'Galeri',
    icon: 'Image',
    submenus: [
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
    ],
  },
  download: {
  label: 'Download',
  icon: 'FileDown',
  submenus: [
    { id: 'semua', label: 'Semua Dokumen' },
    { id: 'formulir', label: 'Formulir' },
    { id: 'kalender', label: 'Kalender Akademik' },
    { id: 'tatib', label: 'Tata Tertib' },
  ],
},
  kontak: {
    label: 'Kontak',
    icon: 'Phone',
    submenus: [
      { id: 'info', label: 'Informasi Kontak' },
      { id: 'lokasi', label: 'Lokasi & Maps' },
      { id: 'jam', label: 'Jam Pelayanan' },
      { id: 'form', label: 'Form Kontak' },
    ],
  },
};

// Helper: ambil submenu berdasarkan menu utama
export function getSubmenus(menuId) {
  return MENU_DATA[menuId]?.submenus || [];
}

// Helper: ambil label menu utama
export function getMenuLabel(menuId) {
  return MENU_DATA[menuId]?.label || menuId;
}