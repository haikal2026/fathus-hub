import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const BUCKET = 'galeri-foto';

// ============================================================
// HOOK: useGaleri — CRUD data galeri dari Supabase
// ============================================================
export function useGaleri() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch semua data galeri
  async function fetchData() {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('galeri')
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

  // Tambah data galeri
  async function tambahGaleri(payload, file) {
    let imageUrl = payload.image_url;

    // Kalau ada file yang diupload → upload ke Storage dulu
    if (file) {
      imageUrl = await uploadFoto(file);
    }

    const { error: err } = await supabase.from('galeri').insert({
      ...payload,
      image_url: imageUrl,
    });

    if (err) throw err;
    await fetchData();
  }

  // Update data galeri
  async function updateGaleri(id, payload, file) {
    let imageUrl = payload.image_url;

    if (file) {
      imageUrl = await uploadFoto(file);
    }

    const { error: err } = await supabase
      .from('galeri')
      .update({ ...payload, image_url: imageUrl })
      .eq('id', id);

    if (err) throw err;
    await fetchData();
  }

  // Hapus data galeri
  async function hapusGaleri(item) {
    // Hapus file dari storage juga (kalau ada)
    if (item.image_url) {
      const fileName = extractFileName(item.image_url);
      if (fileName) {
        await supabase.storage.from(BUCKET).remove([fileName]);
      }
    }

    const { error: err } = await supabase
      .from('galeri')
      .delete()
      .eq('id', item.id);

    if (err) throw err;
    await fetchData();
  }

  // Upload foto ke Supabase Storage
  async function uploadFoto(file) {
    // Generate nama unik: timestamp-random.ext
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: err } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (err) throw err;

    // Ambil public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  }

  // Extract nama file dari public URL
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
    tambahGaleri,
    updateGaleri,
    hapusGaleri,
  };
}

// ============================================================
// HOOK: useGaleriByKategori — filter lokal
// ============================================================
export function filterByKategori(list, kategori) {
  if (kategori === 'semua') return list;
  return list.filter((item) => item.kategori === kategori);
}