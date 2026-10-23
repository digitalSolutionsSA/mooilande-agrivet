import { createClient } from '@supabase/supabase-js';

/**
 * Supabase project "mooilande". The publishable key is meant to ship in browser code:
 * row-level security in the database decides what visitors and admins may read or change.
 */
const SUPABASE_URL = 'https://ebovailsvazjlfutmgmu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ky0dtlkq05LBCO60WAiJaQ_Bn2yHY65';

// Read the email-link result before createClient strips it from the URL
const authHash = new URLSearchParams(window.location.hash.slice(1));
/** True when this page was opened from a password-reset email. */
export const openedFromRecoveryLink = authHash.get('type') === 'recovery';
/** Set when an email link was rejected, e.g. already used or expired. */
export const emailLinkError = authHash.get('error_description');

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export const PRODUCT_BUCKET = 'product-images';

export interface ProductRow {
  id: string;
  department_slug: string;
  name: string;
  brand: string | null;
  description: string | null;
  price: number | null;
  image_path: string | null;
  in_stock: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const productImageUrl = (path: string | null) =>
  path ? supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path).data.publicUrl : null;

// Lives with the cart so the navbar can format prices without loading the database client
export { formatPrice } from './cart';
