import { useEffect, useState } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Save,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const KATEGORI_OPTIONS = ['Akademik', 'Kesiswaan', 'Umum', 'Pengumuman'];

export default function KelolaPengumuman({ onNavigate }) {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from('pengumuman')
      .select('*')
      .order('tanggal', { ascending: false })
      .order('created_at', { ascending: false });

    if (!error) setList(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = list.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.judul?.toLowerCase().includes(q) ||
      p.isi?.toLowerCase().includes(q) ||
      p.kategori?.toLowerCase().includes(q)
    );
  });

  async function handleDelete(item) {
    if (!confirm(`Yakin hapus pengumuman "${item.judul}"?`)) return;
    const { error } = await supabase
      .from('pengumuman')
      .delete()
      .eq('id', item.id);
    if (error) {
      alert('Gagal hapus: ' + error.message);
      return;
    }
    fetchData();
  }

  function handleTambah() {
    setEditingItem(null);
    setShowModal(true);
  }

  function handleEdit(item) {
    setEditingItem(item);
    setShowModal(true);
  }

  function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs text-slate-500 hover:text-orange-600 font-semibold flex items-center gap-1 mb-2 transition"
              >
                <ArrowLeft className="w-3 h-3" />
                Kembali ke Dashboard
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                <Megaphone className="w-7 h-7 text-orange-600" />
                Kelola Pengumuman
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Total: {list.length} pengumuman
              </p>
            </div>
            <button
              onClick={handleTambah}
              className="h-10 px-5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Pengumuman
            </button>
          </div>

          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul, isi, atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-orange-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {search
                  ? 'Tidak ada pengumuman yang cocok.'
                  : 'Belum ada pengumuman. Klik "Tambah Pengumuman" untuk memulai.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <div key={p.id} className="p-5 hover:bg-slate-50/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-extrabold tracking-wider uppercase">
                          {p.kategori}
                        </span>
                        {p.penting && (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-extrabold tracking-wider flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            PENTING
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">
                          {formatTanggal(p.tanggal)}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        {p.judul}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {p.isi}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleEdit(p)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <PengumumanModal
          item={editingItem}
          userId={user?.id}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

/* Modal Form */
function PengumumanModal({ item, userId, onClose, onSuccess }) {
  const isEdit = !!item;
  const [form, setForm] = useState({
    judul: item?.judul || '',
    isi: item?.isi || '',
    kategori: item?.kategori || 'Akademik',
    penting: item?.penting ?? false,
    tanggal: item?.tanggal || new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        judul: form.judul.trim(),
        isi: form.isi.trim(),
        kategori: form.kategori,
        penting: form.penting,
        tanggal: form.tanggal,
      };

      if (isEdit) {
        const { error: err } = await supabase
          .from('pengumuman')
          .update(payload)
          .eq('id', item.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase
          .from('pengumuman')
          .insert({ ...payload, created_by: userId });
        if (err) throw err;
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            {isEdit ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
              Error: {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Judul *</label>
            <input
              required
              value={form.judul}
              onChange={(e) => update('judul', e.target.value)}
              placeholder="Pelaksanaan Ujian Tengah Semester"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-orange-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Isi Pengumuman *</label>
            <textarea
              required
              rows={5}
              value={form.isi}
              onChange={(e) => update('isi', e.target.value)}
              placeholder="Tuliskan isi pengumuman secara detail..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-orange-500 focus:bg-white transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Kategori *</label>
              <select
                value={form.kategori}
                onChange={(e) => update('kategori', e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-orange-500 focus:bg-white transition"
              >
                {KATEGORI_OPTIONS.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Tanggal *</label>
              <input
                type="date"
                required
                value={form.tanggal}
                onChange={(e) => update('tanggal', e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-orange-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100">
            <input
              type="checkbox"
              id="penting"
              checked={form.penting}
              onChange={(e) => update('penting', e.target.checked)}
              className="w-4 h-4 rounded accent-red-600"
            />
            <label htmlFor="penting" className="text-xs font-bold text-red-700 cursor-pointer">
              Tandai sebagai PENTING (akan ditampilkan menonjol)
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 rounded-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Memproses...' : isEdit ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}