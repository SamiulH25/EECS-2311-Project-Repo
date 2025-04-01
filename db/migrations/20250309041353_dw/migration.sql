/*
  Warnings:

  - Made the column `location` on table `Store` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "totalPrice" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Store" ("createdAt", "id", "location", "name", "updatedAt") SELECT "createdAt", "id", "location", "name", "updatedAt" FROM "Store";
DROP TABLE "Store";
ALTER TABLE "new_Store" RENAME TO "Store";
CREATE UNIQUE INDEX "Store_id_name_location_key" ON "Store"("id", "name", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
