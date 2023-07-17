const { Database } = require("sqlite3").verbose();
const db = new Database(":memory:");
const createTable = `
CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
)`;

const run = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
};

const get = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
};

async function main(db) {
  await run(db, createTable);

  const stmt = await run(db, "INSERT INTO books(title) VALUES(?)", [
    "非同期処理しかわからない本",
  ]);
  console.log(stmt.lastID);

  const row = await get(db, "SELECT * FROM books WHERE id = ?", ["1"]);
  console.log(row);

  await run(db, "DROP TABLE IF EXISTS books");
  db.close();
}

main(db);
