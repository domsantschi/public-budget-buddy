// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iektkarhjixcofukulzq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlla3RrYXJoaml4Y29mdWt1bHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NjYzNzcsImV4cCI6MjA1NjA0MjM3N30.N3Y7oNjiY6PZcK71K5ikH9OZoHgQgcEyBUK8MqyAE4c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);