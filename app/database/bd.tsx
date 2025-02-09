import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

export async function createConnection(): Promise<mysql.Connection> {
  if (!connection) {
    connection = await mysql.createConnection({
      database: process.env.DATABASE,
      user: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.BDD_PORT,
      bdd_port: process.env.PORT,
    });
  }
  return connection;
}
