const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://postgres.tthvvurslokshwprnfbv:ebSwrgOlBCGW6MX4@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id TEXT NOT NULL,
        transcript TEXT NOT NULL,
        post TEXT NOT NULL,
        slides JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `);
    
    console.log("Table 'posts' created successfully!");
    
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await client.end();
  }
}

run();
