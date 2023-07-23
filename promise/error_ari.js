import sqlite3 from "sqlite3";
const db = new (sqlite3.verbose().Database)(":memory:");

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

const createTableQuery = `
CREATE TABLEbooks(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE
)`;

run(db, createTableQuery)
  .then(() =>
    run(db, "INSERT INSERT INSERT INSERT!!!!!", [
      "これさえ読めば非同期の全てがわかる本",
    ])
  )
  .then((stmt) => {
    console.log(stmt.lastID);
    return get(db, "GET GET GET GET!!!!!", [stmt.lastID]);
  })
  .then(console.log)
  .catch((error) => console.error(error.message))
  .finally(() => {
    run(db, "DROP TABLE IF EXISTS books").then(() => db.close());
  });
