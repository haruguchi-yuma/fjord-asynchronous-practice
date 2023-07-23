import sqlite3 from "sqlite3";
const db = new (sqlite3.verbose().Database)(":memory:");

const createTableQuery = `
  CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;

db.run(createTableQuery, () => {
  db.run(
    "INSERT INTO books(title) VALUES(?)",
    ["これを読めば非同期処理がわかる本"],
    function () {
      console.log(this.lastID);

      db.get("SELECT * FROM books WHERE id = ?", [this.lastID], (_, row) => {
        console.log(row);

        db.run("DROP TABLE IF EXISTS books", () => {
          db.close();
        });
      });
    }
  );
});
