import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cndvrdnbxpdzkqdnxyuk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZHZyZG5ieHBkemtxZG54eXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5ODM5NjEsImV4cCI6MjA0NjU1OTk2MX0.1pOFJBgp1GWRDY6BnlQeObamvKpES7ly9bcFfFZZEpQ"
);
