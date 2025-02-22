import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

export async function createConnection(): Promise<mysql.Connection> {
  if (!connection) {
    const port = process.env.BDD_PORT
      ? parseInt(process.env.BDD_PORT, 10)
      : 3306;

    connection = await mysql.createConnection({
      database: process.env.DATABASE,
      user: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port,
    });
  }
  return connection;
}
