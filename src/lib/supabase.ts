import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const isConfigured = Boolean(url && anonKey);

export const supabase = isConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: false },
    })
  : null;

export type ProposalResponse = {
  id: string;
  choice: 'yes' | 'think' | 'friends';
  date_date: string | null;
  date_time: string | null;
  date_location: string | null;
  date_activity: string | null;
  message: string | null;
  created_at: string;
};

const EDGE_URL = `${url}/functions/v1/proposal-response`;

type SubmitParams = {
  choice: 'yes' | 'think' | 'friends';
  date_date?: string;
  date_time?: string;
  date_location?: string;
  date_activity?: string;
  message?: string;
};

type SubmitResult = {
  locked: boolean;
  response: ProposalResponse | null;
  emailSent?: boolean;
  emailError?: string;
};

/**
 * Submit Tanvitha's proposal choice (and optionally date details) to the
 * edge function. The server enforces the one-time lock and sends Manish an
 * email. Returns the locked response.
 */
export async function submitProposalResponse(
  params: SubmitParams
): Promise<SubmitResult> {
  if (!isConfigured) {
    throw new Error('Supabase is not configured');
  }

  const res = await fetch(EDGE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data as SubmitResult;
}

/**
 * Check whether a response already exists (without creating one).
 */
export async function checkExistingResponse(): Promise<ProposalResponse | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('proposal_responses')
    .select('id, choice, date_date, date_time, date_location, date_activity, message, created_at')
    .maybeSingle();

  if (error) return null;
  return (data as ProposalResponse) ?? null;
}
