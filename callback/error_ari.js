import sqlite3 from "sqlite3";
// const { Database } = require("sqlite3").verbose();
const db = new (sqlite3.verbose().Database)(":memory:");

const createTableQuery = `
  CREATE TABLE books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;

db.run(createTableQuery, () => {
  db.run(
    "INSERT INSERT INSERT INSERT!!!!!",
    ["これを読めば非同期処理がわかる本"],
    function (error) {
      if (error) {
        console.error(error.message);
        return;
      }

      console.log(this.lastID);

      db.get("GET GET GET GET GET!!!!", [this.lastID], (error, row) => {
        if (error) {
          console.error(error.message);
          return;
        }

        console.log(row);

        db.run("DROP TABLE IF EXISTS books", (error) => {
          db.close();
        });
      });
    }
  );
});
