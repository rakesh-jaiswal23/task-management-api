import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://teepjgjbsxwyorynzvbb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZXBqZ2pic3h3eW9yeW56dmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDg3NjMsImV4cCI6MjA1MDUyNDc2M30.g5tdyawfFg_8qJxeXwbE0ImdhZ_ifRxHXLfQbtYWXdY";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
