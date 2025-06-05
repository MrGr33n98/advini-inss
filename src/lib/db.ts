import Database from 'better-sqlite3';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a new database connection
const db = new Database(':memory:'); // Using in-memory SQLite for Bolt.new compatibility

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    cpf TEXT,
    benefitType TEXT,
    problemType TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create a function to save leads
export const saveLead = async (lead: {
  name: string;
  phone: string;
  cpf?: string;
  benefitType?: string;
  problemType?: string;
}) => {
  // Insert lead into Supabase
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: lead.name,
        phone: lead.phone,
        cpf: lead.cpf || null,
        benefitType: lead.benefitType || null,
        problemType: lead.problemType || null,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error inserting lead: ${error.message}`);
  }

  return data;
};

// Create a function to get all leads
export const getLeads = () => {
  const stmt = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC');
  return stmt.all();
};

export default db;