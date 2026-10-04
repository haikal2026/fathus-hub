import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const BUCKET = 'dokumen';

// ============================================================
// HOOK: useDownload — CRUD data download dari Supabase
// ============================================================
export function useDownload() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch semua data
  async function fetchData() {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('download')
      .select('*')
      .order('tanggal', { ascending: false })
      .order('created_at', { ascending: false });

    if (err) {
      setError(err.message);
      setList([]);
    } else {
      setList(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Tambah data + upload file
  async function tambahDokumen(payload, file) {
    let fileUrl = payload.file_url;
    let ukuran = payload.ukuran;
    let format = payload.format;

    if (file) {
      const uploaded = await uploadFile(file);
      fileUrl = uploaded.url;
      ukuran = uploaded.ukuran;
      format = uploaded.format;
    }

    const { error: err } = await supabase.from('download').insert({
      ...payload,
      file_url: fileUrl,
      ukuran,
      format,
    });

    if (err) throw err;
    await fetchData();
  }

  // Update data
  async function updateDokumen(id, payload, file) {
    let fileUrl = payload.file_url;
    let ukuran = payload.ukuran;
    let format = payload.format;

    if (file) {
      const uploaded = await uploadFile(file);
      fileUrl = uploaded.url;
      ukuran = uploaded.ukuran;
      format = uploaded.format;
    }

    const { error: err } = await supabase
      .from('download')
      .update({ ...payload, file_url: fileUrl, ukuran, format })
      .eq('id', id);

    if (err) throw err;
    await fetchData();
  }

  // Hapus data + file dari storage
  async function hapusDokumen(item) {
    if (item.file_url) {
      const fileName = extractFileName(item.file_url);
      if (fileName) {
        await supabase.storage.from(BUCKET).remove([fileName]);
      }
    }

    const { error: err } = await supabase
      .from('download')
      .delete()
      .eq('id', item.id);

    if (err) throw err;
    await fetchData();
  }

  // Increment counter download
  async function incrementDownload(item) {
    const { error: err } = await supabase
      .from('download')
      .update({ downloads: (item.downloads || 0) + 1 })
      .eq('id', item.id);

    if (err) {
      console.warn('Gagal increment counter:', err.message);
    } else {
      // Update state lokal (tanpa refetch full)
      setList((prev) =>
        prev.map((d) =>
          d.id === item.id ? { ...d, downloads: (d.downloads || 0) + 1 } : d
        )
      );
    }
  }

  // Upload file ke Supabase Storage
  async function uploadFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: err } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (err) throw err;

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      ukuran: formatUkuran(file.size),
      format: ext.toUpperCase(),
    };
  }

  // Helper: format ukuran bytes → "1.2 MB"
  function formatUkuran(bytes) {
    if (!bytes) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  // Extract nama file dari URL
  function extractFileName(url) {
    try {
      const parts = url.split(`/${BUCKET}/`);
      return parts[1] || null;
    } catch {
      return null;
    }
  }

  return {
    list,
    loading,
    error,
    fetchData,
    tambahDokumen,
    updateDokumen,
    hapusDokumen,
    incrementDownload,
  };
}

// ============================================================
// HELPER: Filter berdasarkan kategori
// ============================================================
export function filterByKategori(list, kategori) {
  if (kategori === 'semua') return list;
  return list.filter((item) => item.kategori === kategori);
}

// ============================================================
// HELPER: Cek apakah file masih "baru" (< 7 hari)
// ============================================================
export function isFileBaru(tanggalStr) {
  if (!tanggalStr) return false;
  const tanggal = new Date(tanggalStr);
  const sekarang = new Date();
  const diffHari = (sekarang - tanggal) / (1000 * 60 * 60 * 24);
  return diffHari <= 7;
}

// ============================================================
// HELPER: Warna & ikon berdasarkan format file
// ============================================================
export function getFormatStyle(format) {
  const f = (format || 'pdf').toUpperCase();
  const styles = {
    PDF: { warna: 'bg-red-50 text-red-600 border-red-200', label: 'PDF' },
    DOC: { warna: 'bg-blue-50 text-blue-600 border-blue-200', label: 'DOC' },
    DOCX: { warna: 'bg-blue-50 text-blue-600 border-blue-200', label: 'DOCX' },
    XLS: { warna: 'bg-emerald-50 text-emerald-600 border-emerald-200', label: 'XLS' },
    XLSX: { warna: 'bg-emerald-50 text-emerald-600 border-emerald-200', label: 'XLSX' },
    PPT: { warna: 'bg-orange-50 text-orange-600 border-orange-200', label: 'PPT' },
    PPTX: { warna: 'bg-orange-50 text-orange-600 border-orange-200', label: 'PPTX' },
    ZIP: { warna: 'bg-purple-50 text-purple-600 border-purple-200', label: 'ZIP' },
    RAR: { warna: 'bg-purple-50 text-purple-600 border-purple-200', label: 'RAR' },
  };
  return styles[f] || styles.PDF;
}