"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mysql_1 = __importDefault(require("mysql"));
exports.DB = mysql_1.default.createPool({
    connectionLimit: 10,
    port: 3306,
    host: "localhost",
    // socketPath: "/var/run/mysqld/mysqld.sock",
    user: "local_prod",
    password: "Production1365#",
    database: "wedding-site",
});
