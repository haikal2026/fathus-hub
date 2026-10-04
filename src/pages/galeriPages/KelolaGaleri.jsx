import { useState } from 'react';
import {
  Camera,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useGaleri } from '../../hooks/useGaleri';

const KATEGORI_OPTIONS = [
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

export default function KelolaGaleri({ onNavigate }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { list, loading, hapusGaleri } = useGaleri();

  const [search, setSearch] = useState('');
  const [filterKat, setFilterKat] = useState('semua');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const filtered = list.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.judul?.toLowerCase().includes(q) ||
      item.deskripsi?.toLowerCase().includes(q);
    const matchKat = filterKat === 'semua' || item.kategori === filterKat;
    return matchSearch && matchKat;
  });

  async function handleDelete(item) {
    if (deleteLoading) return;

    const ok = window.confirm(`Yakin hapus foto "${item.judul}"?`);
    if (!ok) return;

    setDeleteLoading(item.id);
    try {
      await hapusGaleri(item);
      toast.success(`Foto "${item.judul}" berhasil dihapus!`);
    } catch (error) {
      console.error('❌ Error delete:', error);
      toast.error('Gagal hapus: ' + error.message);
    } finally {
      setDeleteLoading(null);
    }
  }

  function handleTambah() {
    setEditingItem(null);
    setShowModal(true);
  }

  function handleEdit(item) {
    setEditingItem(item);
    setShowModal(true);
  }

  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs text-slate-500 hover:text-[#0F4C81] font-semibold flex items-center gap-1 mb-2 transition"
              >
                <ArrowLeft className="w-3 h-3" />
                Kembali ke Dashboard
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                <Camera className="w-7 h-7 text-[#0F4C81]" />
                Kelola Galeri
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Total: {list.length} foto
              </p>
            </div>
            <button
              onClick={handleTambah}
              className="h-10 px-5 rounded-full bg-[#0F4C81] hover:bg-[#0d3f6b] text-white text-sm font-bold transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Foto
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari judul atau deskripsi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
              />
            </div>
            <select
              value={filterKat}
              onChange={(e) => setFilterKat(e.target.value)}
              className="h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm font-bold outline-none focus:border-[#0F4C81] focus:bg-white transition"
            >
              <option value="semua">Semua Kategori</option>
              {KATEGORI_OPTIONS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {search || filterKat !== 'semua'
                  ? 'Tidak ada foto yang cocok.'
                  : 'Belum ada foto. Klik "Tambah Foto" untuk memulai.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.image_url}
                      alt={item.judul}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white">
                      <div className="text-[9px] font-bold bg-[#FBBF24] text-[#0F4C81] px-1.5 py-0.5 rounded-full inline-block mb-1">
                        {KATEGORI_OPTIONS.find((k) => k.id === item.kategori)?.label || item.kategori}
                      </div>
                      <div className="text-[11px] font-extrabold leading-tight line-clamp-2">
                        {item.judul}
                      </div>
                      <div className="text-[9px] text-white/80 mt-0.5">
                        {formatTanggal(item.tanggal)}
                      </div>
                    </div>
                  </div>

                  {/* Aksi */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-8 h-8 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center justify-center shadow-lg"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (deleteLoading !== item.id) handleDelete(item);
                      }}
                      disabled={deleteLoading === item.id}
                      className={`w-8 h-8 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center shadow-lg ${
                        deleteLoading === item.id ? 'opacity-50' : ''
                      }`}
                      title="Hapus"
                    >
                      {deleteLoading === item.id ? (
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <GaleriFormModal
          item={editingItem}
          userId={user?.id}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

/* ============================================================
   MODAL FORM
============================================================ */
function GaleriFormModal({ item, userId, onClose, onSuccess }) {
  const { toast } = useToast();
  const { tambahGaleri, updateGaleri } = useGaleri();
  const isEdit = !!item;

  const [form, setForm] = useState({
    judul: item?.judul || '',
    kategori: item?.kategori || 'belajar',
    tanggal: item?.tanggal || new Date().toISOString().split('T')[0],
    deskripsi: item?.deskripsi || '',
    image_url: item?.image_url || '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(item?.image_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validasi tipe file
    if (!selected.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG, PNG, dll)');
      return;
    }

    // Validasi ukuran (max 5 MB)
    if (selected.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5 MB');
      return;
    }

    setError('');
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!isEdit && !file && !form.image_url) {
      setError('Pilih foto terlebih dahulu');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        judul: form.judul.trim(),
        kategori: form.kategori,
        tanggal: form.tanggal,
        deskripsi: form.deskripsi.trim() || null,
        image_url: form.image_url,
        created_by: userId,
      };

      if (isEdit) {
        await updateGaleri(item.id, payload, file);
        toast.success('Foto berhasil diupdate!');
      } else {
        await tambahGaleri(payload, file);
        toast.success('Foto baru berhasil ditambahkan!');
      }

      onSuccess();
    } catch (err) {
      console.error('❌ Error submit:', err);
      setError(err.message || 'Terjadi kesalahan');
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            {isEdit ? 'Edit Foto' : 'Tambah Foto Baru'}
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
              {error}
            </div>
          )}

          {/* UPLOAD FOTO */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">
              Foto {isEdit ? '(biarkan kosong jika tidak diganti)' : '*'}
            </label>
            <div className="relative">
              {preview ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-200 aspect-video bg-slate-100">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview('');
                      update('image_url', '');
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-slate-300 bg-[#F8FAFC] hover:border-[#0F4C81] hover:bg-blue-50/30 transition">
                  <Upload className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm font-bold text-slate-600">
                    Klik untuk pilih foto
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    JPG, PNG, max 5 MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* JUDUL */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">
              Judul Foto *
            </label>
            <input
              required
              value={form.judul}
              onChange={(e) => update('judul', e.target.value)}
              placeholder="KBM Kelas XII Putra"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          {/* KATEGORI + TANGGAL */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">
                Kategori *
              </label>
              <select
                value={form.kategori}
                onChange={(e) => update('kategori', e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
              >
                {KATEGORI_OPTIONS.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">
                Tanggal *
              </label>
              <input
                type="date"
                required
                value={form.tanggal}
                onChange={(e) => update('tanggal', e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
              />
            </div>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">
              Deskripsi (opsional)
            </label>
            <textarea
              rows={3}
              value={form.deskripsi}
              onChange={(e) => update('deskripsi', e.target.value)}
              placeholder="Deskripsi singkat tentang foto ini..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition resize-none"
            />
          </div>

          {/* AKSI */}
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
              className="flex-1 h-11 rounded-full bg-[#0F4C81] hover:bg-[#0d3f6b] disabled:bg-slate-300 text-white font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Menyimpan...' : isEdit ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}