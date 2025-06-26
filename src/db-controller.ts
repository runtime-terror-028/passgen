import { DatabaseSync } from "node:sqlite";
import { GetCredResult } from "../main.d.ts";

const db = new DatabaseSync("db.sqlite");

// create table for credentials exit program if failed
try {
  db.exec(`
        CREATE TABLE IF NOT EXISTS credentials
        (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            platform   TEXT,
            username   TEXT,
            password   TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
} catch (error) {
  console.error(`❌ Failed to initiate database: ${error}`);
  console.info(`⚠️ Program will exit now!`);
  Deno.exit(1);
}

export function createNewCredentials(
  userPlatform: string,
  userUsername: string,
  userPassword: string,
): "success" | "failed" {
  try {
    db.prepare(
      `
    INSERT INTO credentials (platform, username, password) VALUES (?, ?, ?);
    `,
    ).run(userPlatform, userUsername, userPassword);
  } catch (_error) {
    return "failed";
  }
  return "success";
}

export function getAllCredentials(): GetCredResult {
  try {
    const stmt = db.prepare("SELECT * FROM credentials");
    const data = stmt.all().map((row) => ({
      id: row.id as number,
      platform: row.platform as string,
      username: row.username as string,
      password: row.password as string,
      created_at: row.created_at as string,
    }));
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
}

export function getCredentialsByPlatform(platform: string): GetCredResult {
  try {
    const stmt = db.prepare(`
    SELECT * FROM credentials
    WHERE LOWER(platform) LIKE ?
  `);
    const pattern: string = `%${platform.toLowerCase()}%`;
    const data = stmt.all(pattern).map((row) => ({
      id: row.id as number,
      platform: row.platform as string,
      username: row.username as string,
      password: row.password as string,
      created_at: row.created_at as string,
    }));
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: `${error}` };
  }
}

export function closeDatabaseConnection(): void {
  db.close();
}
