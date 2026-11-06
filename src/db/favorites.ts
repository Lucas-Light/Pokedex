import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

const DATABASE_NAME = "pokedex.db";

let database: Promise<SQLiteDatabase> | undefined;

async function openDatabase(): Promise<SQLiteDatabase> {
  const db = await openDatabaseAsync(DATABASE_NAME);
  await db.execAsync("CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL);");
  return db;
}

function getDatabase(): Promise<SQLiteDatabase> {
  // A failed open is not kept, so Retry opens the database again.
  database ??= openDatabase().catch((error: unknown) => {
    database = undefined;
    throw error;
  });
  return database;
}

export async function getFavoriteIds(): Promise<number[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{ id: number }>("SELECT id FROM favorites");
  return rows.map((row) => row.id);
}

export async function addFavorite(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("INSERT OR IGNORE INTO favorites (id) VALUES (?)", id);
}

export async function removeFavorite(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM favorites WHERE id = ?", id);
}
