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
 * Panggil Edge Function untuk hapus user dari auth.users
 * (dan otomatis dari profiles karena CASCADE)
 * Hanya admin yang bisa.
 */
export async function deleteUser(userId) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error('Tidak ada session. Silakan login ulang.');

  const res = await fetch(`${SUPABASE_URL}/functions/v1/delete-user`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Gagal menghapus user');
  }
  return data;
}