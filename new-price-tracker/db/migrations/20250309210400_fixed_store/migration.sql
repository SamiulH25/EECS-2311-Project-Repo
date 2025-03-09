/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Store` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Store" ("createdAt", "id", "location", "name", "updatedAt") SELECT "createdAt", "id", "location", "name", "updatedAt" FROM "Store";
DROP TABLE "Store";
ALTER TABLE "new_Store" RENAME TO "Store";
CREATE UNIQUE INDEX "Store_id_name_location_key" ON "Store"("id", "name", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
