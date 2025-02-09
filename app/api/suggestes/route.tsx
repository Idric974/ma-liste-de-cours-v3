import { createConnection } from "../../database/bd";
import { NextResponse } from "next/server";
import type { Connection } from "mysql2/promise";

export async function GET(): Promise<NextResponse> {
  try {
    // On précise le type Connection pour "db"
    const db: Connection = await createConnection();

    const sql = "SELECT * FROM suggests";
    // "query" renvoie un tableau [rows, fields], où rows est généralement un tableau d'objets
    const [suggests] = await db.query(sql);

    // On renvoie la réponse au format JSON
    return NextResponse.json(suggests);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: (error as Error).message,
    });
  }
}
