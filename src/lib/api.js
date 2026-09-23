import { supabase } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Panggil Edge Function untuk create user (siswa/guru)
 */
export async function createUser(payload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('Tidak ada session. Silakan login ulang.');

  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-user`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal membuat user');
  }
  return data;
}

/**
 * Hapus user (siswa/guru) — via Edge Function juga
 * (untuk sementara, kita hapus dari profiles saja)
 */
export async function deleteProfile(userId) {
  const { error } = await supabase.from('profiles').delete().eq('id', userId);
  if (error) throw error;
  return true;
}