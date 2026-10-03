// ============================================================
// DATA AKADEMIK — MA FATHUS SALAFI
// Semua data terpusat di sini agar mudah di-update
// ============================================================

// ---------------------------------------------
// 1. DATA GURU (kode A-O)
// ---------------------------------------------
export const GURU_DATA = [
  { kode: 'A', nama: 'Zainuddin, S.Pd',        mapel: 'Bahasa Indonesia; TIK' },
  { kode: 'B', nama: 'Haeriyanto, S.Pd.I',     mapel: 'Fikih; Akidah Akhlak' },
  { kode: 'C', nama: 'Abdul Wahid, S.Ag',      mapel: "Qur'an Hadits" },
  { kode: 'D', nama: 'Joko Suprapto, S.Pd',    mapel: 'Bahasa Indonesia' },
  { kode: 'E', nama: 'Zainul Mustafa, S.Pd',   mapel: 'Sosiologi; Sejarah' },
  { kode: 'F', nama: 'Tin Indayati, S.Pd',     mapel: 'Ekonomi; Seni Budaya' },
  { kode: 'G', nama: 'Nur Aida, M.Pd.I',       mapel: 'PKn; Prakarya' },
  { kode: 'H', nama: 'Abd. Rahman Shodik, S.Pd', mapel: 'Geografi; Sejarah' },
  { kode: 'I', nama: 'Imam Wahyudi, S.Pd',     mapel: 'Matematika' },
  { kode: 'J', nama: 'Dhesy Ismianingtyastutik, S.Pd', mapel: 'Bahasa Inggris; Seni Budaya' },
  { kode: 'K', nama: 'Dini Elvina Apriliyanti, S.Pd',  mapel: 'Biologi; Kimia' },
  { kode: 'L', nama: 'Alif Alim Sholata, S.Pd', mapel: 'Penjas Orkes; Prakarya' },
  { kode: 'M', nama: 'Juswanti, S.Pd.I',       mapel: 'SKI' },
  { kode: 'N', nama: 'Ana Fi Kanafillah',      mapel: 'Aswaja' },
  { kode: 'O', nama: 'Uyunil Kamiliyah, S.Ag, S.Pd', mapel: 'Bahasa Arab' },
];

// Helper: cari guru berdasarkan kode
export function getGuruByKode(kode) {
  return GURU_DATA.find((g) => g.kode === kode) || null;
}

// ---------------------------------------------
// 2. RUMPUN MATA PELAJARAN
// ---------------------------------------------
export const RUMPUN_MAPEL = {
  Umum: [
    'PKn', 'Bahasa Indonesia', 'Bahasa Inggris', 'Bahasa Arab',
    'Matematika', 'Fisika', 'Kimia', 'Biologi', 'Ekonomi',
    'Sosiologi', 'Geografi', 'Sejarah', 'Penjas Orkes', 'TIK', 'Seni Budaya',
  ],
  Keagamaan: ["Fikih", "Akidah Akhlak", "SKI", "Qur'an Hadits", "Aswaja"],
  Keterampilan: ['Prakarya'],
};

// ---------------------------------------------
// 3. ALOKASI WAKTU
// ---------------------------------------------
export const ALOKASI_REGULER = [
  { jam: '0', waktu: '07.00-07.30 WIB', ket: 'Persiapan / Tahfidz' },
  { jam: 'I', waktu: '07.30-08.30 WIB', ket: 'Jam ke-1' },
  { jam: 'II', waktu: '08.30-09.30 WIB', ket: 'Jam ke-2' },
  { jam: 'III', waktu: '09.30-10.30 WIB', ket: 'Jam ke-3' },
  { jam: 'ISTIRAHAT', waktu: '10.30-11.00 WIB', ket: 'Istirahat' },
  { jam: 'IV', waktu: '11.00-12.00 WIB', ket: 'Jam ke-4' },
  { jam: 'V', waktu: '12.00-12.30 WIB', ket: 'Jam ke-5' },
];

export const ALOKASI_JUMAT = [
  { jam: '0', waktu: '07.00-07.30 WIB', ket: 'Persiapan' },
  { jam: 'I', waktu: '07.30-07.55 WIB', ket: '25 menit' },
  { jam: 'II', waktu: '07.55-08.20 WIB', ket: '25 menit' },
  { jam: 'III', waktu: '08.20-08.45 WIB', ket: '25 menit' },
  { jam: 'IV', waktu: '08.45-09.10 WIB', ket: '25 menit' },
  { jam: 'ISTIRAHAT', waktu: '09.10-09.30 WIB', ket: 'Istirahat' },
  { jam: 'V', waktu: '09.30-09.55 WIB', ket: '25 menit' },
  { jam: 'VI', waktu: '09.55-10.20 WIB', ket: '25 menit' },
  { jam: 'VII', waktu: '10.20-10.45 WIB', ket: '25 menit' },
  { jam: 'VIII', waktu: '10.45-11.10 WIB', ket: '25 menit' },
];

// ---------------------------------------------
// 4. JADWAL PELAJARAN — PUTRA (Kelas A)
// Struktur: { hari: { jam: { X: {k, m}, XI: {k, m}, XII: {k, m} } } }
// k = kode guru, m = mata pelajaran
// ---------------------------------------------
export const JADWAL_PUTRA = {
  SENIN: [
    { jam: 'I',   X: { k: 'G', m: 'PKn' },           XI: { k: 'F', m: 'Ekonomi' },       XII: { k: 'B', m: 'Fikih' } },
    { jam: 'II',  X: { k: 'G', m: 'PKn' },           XI: { k: 'F', m: 'Ekonomi' },       XII: { k: 'B', m: 'Fikih' } },
    { jam: 'III', X: { k: 'B', m: 'Fikih' },         XI: { k: 'M', m: 'SKI' },           XII: { k: 'D', m: 'B. Indonesia' } },
    { jam: 'IV',  X: { k: 'B', m: 'Fikih' },         XI: { k: 'M', m: 'SKI' },           XII: { k: 'D', m: 'B. Indonesia' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'H', m: 'Geografi' },      XI: { k: 'B', m: 'Fikih' },         XII: { k: 'I', m: 'Matematika' } },
    { jam: 'VI',  X: { k: 'H', m: 'Geografi' },      XI: { k: 'B', m: 'Fikih' },         XII: { k: 'I', m: 'Matematika' } },
    { jam: 'VII', X: { k: 'I', m: 'Matematika' },    XI: { k: 'G', m: 'PKn' },           XII: { k: 'L', m: 'Prakarya' } },
    { jam: 'VIII',X: { k: 'I', m: 'Matematika' },    XI: { k: 'G', m: 'PKn' },           XII: { k: 'L', m: 'Prakarya' } },
  ],
  SELASA: [
    { jam: 'I',   X: { k: 'D', m: 'B. Indonesia' },  XI: { k: 'A', m: 'Akidah Akhlak' }, XII: { k: 'C', m: 'Seni Budaya' } },
    { jam: 'II',  X: { k: 'D', m: 'B. Indonesia' },  XI: { k: 'A', m: 'Akidah Akhlak' }, XII: { k: 'C', m: 'Seni Budaya' } },
    { jam: 'III', X: { k: 'L', m: 'Prakarya' },      XI: { k: 'I', m: 'Matematika' },    XII: { k: 'F', m: 'Ekonomi' } },
    { jam: 'IV',  X: { k: 'L', m: 'Prakarya' },      XI: { k: 'I', m: 'Matematika' },    XII: { k: 'F', m: 'Ekonomi' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'F', m: 'Ekonomi' },       XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'H', m: 'Geografi' } },
    { jam: 'VI',  X: { k: 'F', m: 'Ekonomi' },       XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'H', m: 'Geografi' } },
    { jam: 'VII', X: { k: 'M', m: 'SKI' },           XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'A', m: 'Akidah Akhlak' } },
    { jam: 'VIII',X: { k: 'M', m: 'SKI' },           XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'A', m: 'Akidah Akhlak' } },
  ],
  RABU: [
    { jam: 'I',   X: { k: 'C', m: 'Seni Budaya' },   XI: { k: 'L', m: 'Penjas Orkes' },  XII: { k: 'K', m: 'Biologi' } },
    { jam: 'II',  X: { k: 'C', m: 'Seni Budaya' },   XI: { k: 'L', m: 'Penjas Orkes' },  XII: { k: 'K', m: 'Biologi' } },
    { jam: 'III', X: { k: 'K', m: 'Biologi' },       XI: { k: 'K', m: 'Biologi' },       XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'IV',  X: { k: 'K', m: 'Biologi' },       XI: { k: 'K', m: 'Biologi' },       XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'E', m: 'Sosiologi' },     XI: { k: 'E', m: 'Sosiologi' },     XII: { k: 'G', m: 'PKn' } },
    { jam: 'VI',  X: { k: 'E', m: 'Sosiologi' },     XI: { k: 'E', m: 'Sosiologi' },     XII: { k: 'G', m: 'PKn' } },
    { jam: 'VII', X: { k: 'N', m: 'Aswaja' },        XI: { k: 'J', m: 'B. Inggris' },    XII: { k: 'J', m: 'B. Inggris' } },
    { jam: 'VIII',X: { k: 'N', m: 'Aswaja' },        XI: { k: 'J', m: 'B. Inggris' },    XII: { k: 'J', m: 'B. Inggris' } },
  ],
  KAMIS: [
    { jam: 'I',   X: { k: 'J', m: 'B. Inggris' },    XI: { k: 'H', m: 'Sejarah' },       XII: { k: 'M', m: 'SKI' } },
    { jam: 'II',  X: { k: 'J', m: 'B. Inggris' },    XI: { k: 'H', m: 'Sejarah' },       XII: { k: 'M', m: 'SKI' } },
    { jam: 'III', X: { k: 'H', m: 'Geografi' },      XI: { k: 'N', m: 'Aswaja' },        XII: { k: 'N', m: 'Aswaja' } },
    { jam: 'IV',  X: { k: 'H', m: 'Geografi' },      XI: { k: 'N', m: 'Aswaja' },        XII: { k: 'N', m: 'Aswaja' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'O', m: "Qur'an Hadits" }, XII: { k: 'O', m: "Qur'an Hadits" } },
    { jam: 'VI',  X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'O', m: "Qur'an Hadits" }, XII: { k: 'O', m: "Qur'an Hadits" } },
    { jam: 'VII', X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'O', m: 'B. Arab' },        XII: { k: 'O', m: 'B. Arab' } },
    { jam: 'VIII',X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'O', m: 'B. Arab' },        XII: { k: 'O', m: 'B. Arab' } },
  ],
  "JUM'AT": [
    { jam: 'I',   X: { k: 'O', m: 'B. Arab' },       XI: { k: 'A', m: 'TIK' },           XII: { k: 'K', m: 'Kimia' } },
    { jam: 'II',  X: { k: 'O', m: 'B. Arab' },       XI: { k: 'A', m: 'TIK' },           XII: { k: 'K', m: 'Kimia' } },
    { jam: 'III', X: { k: 'B', m: 'Fikih' },         XI: { k: 'K', m: 'Biologi' },       XII: { k: 'I', m: 'Fisika' } },
    { jam: 'IV',  X: { k: 'B', m: 'Fikih' },         XI: { k: 'K', m: 'Biologi' },       XII: { k: 'I', m: 'Fisika' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'H', m: 'Sejarah' },       XII: { k: 'J', m: 'B. Inggris' } },
    { jam: 'VI',  X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'H', m: 'Sejarah' },       XII: { k: 'J', m: 'B. Inggris' } },
  ],
  SABTU: [
    { jam: 'I',   X: { k: 'K', m: 'Biologi' },       XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'O', m: 'B. Arab' } },
    { jam: 'II',  X: { k: 'K', m: 'Biologi' },       XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'O', m: 'B. Arab' } },
    { jam: 'III', X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'A', m: 'Akidah Akhlak' } },
    { jam: 'IV',  X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'A', m: 'Akidah Akhlak' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'E', m: 'Sosiologi' },     XI: { k: 'G', m: 'PKn' },           XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'VI',  X: { k: 'E', m: 'Sosiologi' },     XI: { k: 'G', m: 'PKn' },           XII: { k: 'E', m: 'Sosiologi' } },
  ],
};

// ---------------------------------------------
// 5. JADWAL PELAJARAN — PUTRI (Kelas B)
// ---------------------------------------------
export const JADWAL_PUTRI = {
  SENIN: [
    { jam: 'I',   X: { k: 'L', m: 'Penjas Orkes' },  XI: { k: 'E', m: 'Sosiologi' },     XII: { k: 'D', m: 'B. Indonesia' } },
    { jam: 'II',  X: { k: 'L', m: 'Penjas Orkes' },  XI: { k: 'E', m: 'Sosiologi' },     XII: { k: 'D', m: 'B. Indonesia' } },
    { jam: 'III', X: { k: 'E', m: 'Sosiologi' },     XI: { k: 'J', m: 'B. Inggris' },    XII: { k: 'L', m: 'Penjas Orkes' } },
    { jam: 'IV',  X: { k: 'E', m: 'Sosiologi' },     XI: { k: 'J', m: 'B. Inggris' },    XII: { k: 'L', m: 'Penjas Orkes' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'K', m: 'Biologi' },       XI: { k: 'N', m: 'Aswaja' },        XII: { k: 'J', m: 'B. Inggris' } },
    { jam: 'VI',  X: { k: 'K', m: 'Biologi' },       XI: { k: 'N', m: 'Aswaja' },        XII: { k: 'J', m: 'B. Inggris' } },
    { jam: 'VII', X: { k: 'J', m: 'B. Inggris' },    XI: { k: 'H', m: 'Sejarah' },       XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'VIII',X: { k: 'J', m: 'B. Inggris' },    XI: { k: 'H', m: 'Sejarah' },       XII: { k: 'E', m: 'Sosiologi' } },
  ],
  SELASA: [
    { jam: 'I',   X: { k: 'D', m: 'B. Indonesia' },  XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'C', m: 'Seni Budaya' } },
    { jam: 'II',  X: { k: 'D', m: 'B. Indonesia' },  XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'C', m: 'Seni Budaya' } },
    { jam: 'III', X: { k: 'B', m: 'Fikih' },         XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'F', m: 'Ekonomi' } },
    { jam: 'IV',  X: { k: 'B', m: 'Fikih' },         XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'F', m: 'Ekonomi' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'H', m: 'Geografi' },      XI: { k: 'F', m: 'Ekonomi' },       XII: { k: 'K', m: 'Biologi' } },
    { jam: 'VI',  X: { k: 'H', m: 'Geografi' },      XI: { k: 'F', m: 'Ekonomi' },       XII: { k: 'K', m: 'Biologi' } },
    { jam: 'VII', X: { k: 'F', m: 'Ekonomi' },       XI: { k: 'K', m: 'Biologi' },       XII: { k: 'H', m: 'Geografi' } },
    { jam: 'VIII',X: { k: 'F', m: 'Ekonomi' },       XI: { k: 'K', m: 'Biologi' },       XII: { k: 'H', m: 'Geografi' } },
  ],
  RABU: [
    { jam: 'I',   X: { k: 'C', m: 'Seni Budaya' },   XI: { k: 'L', m: 'Prakarya' },      XII: { k: 'K', m: 'Kimia' } },
    { jam: 'II',  X: { k: 'C', m: 'Seni Budaya' },   XI: { k: 'L', m: 'Prakarya' },      XII: { k: 'K', m: 'Kimia' } },
    { jam: 'III', X: { k: 'K', m: 'Kimia' },         XI: { k: 'I', m: 'Matematika' },    XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'IV',  X: { k: 'K', m: 'Kimia' },         XI: { k: 'I', m: 'Matematika' },    XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'M', m: 'SKI' },           XI: { k: 'M', m: 'SKI' },           XII: { k: 'G', m: 'PKn' } },
    { jam: 'VI',  X: { k: 'M', m: 'SKI' },           XI: { k: 'M', m: 'SKI' },           XII: { k: 'G', m: 'PKn' } },
    { jam: 'VII', X: { k: 'I', m: 'Matematika' },    XI: { k: 'G', m: 'PKn' },           XII: { k: 'J', m: 'B. Inggris' } },
    { jam: 'VIII',X: { k: 'I', m: 'Matematika' },    XI: { k: 'G', m: 'PKn' },           XII: { k: 'J', m: 'B. Inggris' } },
  ],
  KAMIS: [
    { jam: 'I',   X: { k: 'J', m: 'B. Inggris' },    XI: { k: 'H', m: 'Geografi' },      XII: { k: 'M', m: 'SKI' } },
    { jam: 'II',  X: { k: 'J', m: 'B. Inggris' },    XI: { k: 'H', m: 'Geografi' },      XII: { k: 'M', m: 'SKI' } },
    { jam: 'III', X: { k: 'H', m: 'Sejarah' },       XI: { k: 'N', m: 'Aswaja' },        XII: { k: 'N', m: 'Aswaja' } },
    { jam: 'IV',  X: { k: 'H', m: 'Sejarah' },       XI: { k: 'N', m: 'Aswaja' },        XII: { k: 'N', m: 'Aswaja' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'O', m: "Qur'an Hadits" }, XII: { k: 'O', m: "Qur'an Hadits" } },
    { jam: 'VI',  X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'O', m: "Qur'an Hadits" }, XII: { k: 'O', m: "Qur'an Hadits" } },
    { jam: 'VII', X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'O', m: 'B. Arab' },        XII: { k: 'O', m: 'B. Arab' } },
    { jam: 'VIII',X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'O', m: 'B. Arab' },        XII: { k: 'O', m: 'B. Arab' } },
  ],
  "JUM'AT": [
    { jam: 'I',   X: { k: 'O', m: 'B. Arab' },       XI: { k: 'A', m: 'TIK' },           XII: { k: 'I', m: 'Fisika' } },
    { jam: 'II',  X: { k: 'O', m: 'B. Arab' },       XI: { k: 'A', m: 'TIK' },           XII: { k: 'I', m: 'Fisika' } },
    { jam: 'III', X: { k: 'B', m: 'Fikih' },         XI: { k: 'K', m: 'Biologi' },       XII: { k: 'K', m: 'Kimia' } },
    { jam: 'IV',  X: { k: 'B', m: 'Fikih' },         XI: { k: 'K', m: 'Biologi' },       XII: { k: 'K', m: 'Kimia' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'H', m: 'Geografi' },      XII: { k: 'D', m: 'B. Indonesia' } },
    { jam: 'VI',  X: { k: 'O', m: "Qur'an Hadits" }, XI: { k: 'H', m: 'Geografi' },      XII: { k: 'D', m: 'B. Indonesia' } },
  ],
  SABTU: [
    { jam: 'I',   X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'O', m: 'B. Arab' } },
    { jam: 'II',  X: { k: 'A', m: 'Akidah Akhlak' }, XI: { k: 'D', m: 'B. Indonesia' },  XII: { k: 'O', m: 'B. Arab' } },
    { jam: 'III', X: { k: 'N', m: 'Aswaja' },        XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'A', m: 'Akidah Akhlak' } },
    { jam: 'IV',  X: { k: 'N', m: 'Aswaja' },        XI: { k: 'C', m: 'Seni Budaya' },   XII: { k: 'A', m: 'Akidah Akhlak' } },
    { jam: 'ISTIRAHAT', isIstirahat: true },
    { jam: 'V',   X: { k: 'G', m: 'PKn' },           XI: { k: 'G', m: 'PKn' },           XII: { k: 'E', m: 'Sosiologi' } },
    { jam: 'VI',  X: { k: 'G', m: 'PKn' },           XI: { k: 'G', m: 'PKn' },           XII: { k: 'E', m: 'Sosiologi' } },
  ],
};

export const HARI_LIST = ['SENIN', 'SELASA', 'RABU', 'KAMIS', "JUM'AT", 'SABTU'];

// ---------------------------------------------
// 6. JADWAL UJIAN
// ---------------------------------------------
export const JADWAL_UJIAN = [
  {
    id: 'uts-ganjil',
    nama: 'Ujian Tengah Semester (UTS) Ganjil',
    tanggal: '12 – 20 September 2026',
    durasi: '9 hari',
    status: 'akan-datang',
    warna: 'blue',
    deskripsi: 'Ujian tengah semester untuk semua kelas X, XI, XII. Mencakup materi pembelajaran pekan ke-1 hingga ke-8.',
  },
  {
    id: 'uas-ganjil',
    nama: 'Ujian Akhir Semester (UAS) Ganjil',
    tanggal: '1 – 9 Desember 2026',
    durasi: '9 hari',
    status: 'akan-datang',
    warna: 'amber',
    deskripsi: 'Ujian akhir semester ganjil. Menjadi penentu nilai rapor semester 1.',
  },
  {
    id: 'um-xii',
    nama: 'Ujian Madrasah Kelas XII',
    tanggal: '10 – 18 Maret 2027',
    durasi: '9 hari',
    status: 'akan-datang',
    warna: 'emerald',
    deskripsi: 'Ujian kelulusan khusus kelas XII. Mencakup seluruh mapel wajib dan keagamaan.',
  },
  {
    id: 'tahfidz',
    nama: 'Ujian Tahfidz Akhir Tahun',
    tanggal: '5 – 10 April 2027',
    durasi: '6 hari',
    status: 'akan-datang',
    warna: 'purple',
    deskripsi: 'Ujian hafalan Al-Qur\'an untuk seluruh santri. Target minimal Juz 30.',
  },
];

export const TATA_TERTIB_UJIAN = [
  'Peserta wajib hadir 15 menit sebelum ujian dimulai',
  'Membawa kartu peserta ujian & alat tulis sendiri',
  'Dilarang membawa HP, buku, atau catatan apapun',
  'Berpakaian seragam lengkap & rapi',
  'Tidak diperkenankan keluar kelas tanpa izin pengawas',
  'Pelanggaran tata tertib berakibat sanksi akademik',
];