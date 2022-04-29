import mysql from "mysql";
const DB_OPTIONS = process.env.ISWINDOWS ? {
  connectionLimit: 10,
  port: 3306,
  host: "localhost",
  user: "local_prod",
  password: "Production1365#",
  database: "wedding-site",
} : {
  connectionLimit: 10,
  socketPath: "/var/run/mysqld/mysqld.sock",
  user: "local_prod",
  password: "Production1365#",
  database: "wedding-site",
}

export const DB = mysql.createPool(DB_OPTIONS);

// export const isWindows = "build";