"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mysql_1 = __importDefault(require("mysql"));
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
};
exports.DB = mysql_1.default.createPool(DB_OPTIONS);
// export const isWindows = "build";
