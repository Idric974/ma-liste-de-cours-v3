import { createConnection } from "../../database/bd";
import { NextResponse } from "next/server";
import type { Connection } from "mysql2/promise";

export async function GET(): Promise<NextResponse> {
  try {
    const db: Connection = await createConnection();

    const sql = "SELECT * FROM listes";

    const [listes] = await db.query(sql);

    return NextResponse.json(listes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: (error as Error).message,
    });
  }
}
