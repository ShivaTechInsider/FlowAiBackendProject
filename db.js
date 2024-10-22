const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // In-memory DB for simplicity

db.serialize(() => {
    // Create users table
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

    // Create transactions table
    db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL, -- "income" or "expense"
      category_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

    // Create categories table
    db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL -- "income" or "expense"
    );
  `);

    // Insert default categories
    const insertCategories = db.prepare(`
    INSERT INTO categories (name, type)
    VALUES (?, ?)
  `);

    insertCategories.run("Salary", "income");
    insertCategories.run("Freelancing", "income");
    insertCategories.run("Food", "expense");
    insertCategories.run("Rent", "expense");
    insertCategories.run("Utilities", "expense");
    insertCategories.finalize();
});

module.exports = db;