import { useState } from 'react';
import Header from './components/Header';
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Akademik from './pages/Akademik';
import Kesiswaan from './pages/Kesiswaan';
import Informasi from './pages/Informasi';
import Galeri from './pages/Galeri';
import Download from './pages/Download';
import Kontak from './pages/Kontak';

function App() {
  const [page, setPage] = useState('beranda');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header currentPage={page} onNavigate={setPage} />

      <main>
        {page === 'beranda' && <Beranda onNavigate={setPage} />}
        {page === 'profil' && <Profil />}
        {page === 'akademik' && <Akademik />}
        {page === 'kesiswaan' && <Kesiswaan />}
        {page === 'informasi' && <Informasi />}
        {page === 'galeri' && <Galeri />}
        {page === 'download' && <Download />}
        {page === 'kontak' && <Kontak />}
        {page === 'perpus' && (
          <div className="p-8 text-center">
            <div className="bg-white rounded-3xl p-10 max-w-md mx-auto border">
              <div className="text-4xl mb-3">📚</div>
              <div className="font-bold text-lg text-slate-800">
                Perpustakaan Digital
              </div>
              <div className="text-slate-500 text-sm mt-1">
                Akan tersedia sebagai aplikasi terpisah.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;