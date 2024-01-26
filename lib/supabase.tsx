// install npm add @supabase/supabase-js for this to work.
import { createClient } from "@supabase/supabase-js";

// Retrieve Supabase URL and Service Role Key from environment variables
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Create a Supabase client using the Supabase URL and Service Role Key
export const supabase = createClient(supabaseUrl, supabaseKey);

// This function fetches a single blog entry by its id
export async function getBlogById(id: number) {
  // Perform a select query on the 'blogs' table, filtering by id
  const { data, error } = await supabase
    .from("blogs")
    .select()
    .eq("id", id)
    .single();

  // Return the fetched data (a single blog entry)
  return data;
}

// This function fetches all blog entries, ordered by 'created_at' in descending order
export async function getAllBlogs() {
  // Perform a select query on the 'blogs' table, ordering by 'created_at' in descending order
  const { data, error } = await supabase
    .from("blogs")
    .select()
    .order("created_at", { ascending: false });

  // Return the fetched data (all blog entries)
  return data;
}
