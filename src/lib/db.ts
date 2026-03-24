import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Use a Proxy to provide a clear error message only when accessed if missing
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop === 'symbol' || prop === 'inspect' || prop === 'valueOf') return undefined;
        throw new Error(
          `Supabase client accessed but not configured. ` +
          `Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.`
        );
      }
    }) as ReturnType<typeof createClient>;
