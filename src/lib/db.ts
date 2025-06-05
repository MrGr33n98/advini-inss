import Database from 'better-sqlite3';

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
export const saveLead = (lead: {
  name: string;
  phone: string;
  cpf?: string;
  benefitType?: string;
  problemType?: string;
}) => {
  const stmt = db.prepare(`
    INSERT INTO leads (name, phone, cpf, benefitType, problemType)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const info = stmt.run(
    lead.name,
    lead.phone,
    lead.cpf || null,
    lead.benefitType || null,
    lead.problemType || null
  );
  
  return info.lastInsertRowid;
};

// Create a function to get all leads
export const getLeads = () => {
  const stmt = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC');
  return stmt.all();
};

export default db;