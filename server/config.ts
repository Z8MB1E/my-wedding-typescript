import mysql from "mysql";
export const DB = mysql.createPool({
  connectionLimit: 10,
  port: 3306,
  host: "localhost",
  // socketPath: "/var/run/mysqld/mysqld.sock",
  user: "local_prod",
  password: "Production1365#",
  database: "wedding-site",
});