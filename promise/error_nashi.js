import sqlite3 from "sqlite3";
const db = new (sqlite3.verbose().Database)(":memory:");

const run = (db, query, params = []) => {
  return new Promise((resolve) => {
    db.run(query, params, function () {
      resolve(this);
    });
  });
};

const get = (db, query, params = []) => {
  return new Promise((resolve) => {
    db.get(query, params, (_, row) => {
      resolve(row);
    });
  });
};

const createTableQuery = `
CREATE TABLE books(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE
)`;

run(db, createTableQuery)
  .then(() =>
    run(db, "INSERT INTO books(title) VALUES(?)", [
      "これさえ読めば非同期の全てがわかる本",
    ])
  )
  .then((stmt) => {
    console.log(stmt.lastID);
    return get(db, "SELECT * FROM books WHERE id = ?", [stmt.lastID]);
  })
  .then(console.log)
  .finally(() => {
    run(db, "DROP TABLE IF EXISTS books").then(() => db.close());
  });
