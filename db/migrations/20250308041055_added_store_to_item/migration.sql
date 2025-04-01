/*
  Warnings:

  - Added the required column `storeLocation` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeName` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "location" TEXT
);
INSERT INTO "new_Store" ("createdAt", "id", "location", "name", "updatedAt") SELECT "createdAt", "id", "location", "name", "updatedAt" FROM "Store";
DROP TABLE "Store";
ALTER TABLE "new_Store" RENAME TO "Store";
CREATE UNIQUE INDEX "Store_id_name_location_key" ON "Store"("id", "name", "location");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0.00,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "storeId" INTEGER NOT NULL,
    "storeName" TEXT NOT NULL,
    "storeLocation" TEXT NOT NULL,
    CONSTRAINT "Item_storeId_storeName_storeLocation_fkey" FOREIGN KEY ("storeId", "storeName", "storeLocation") REFERENCES "Store" ("id", "name", "location") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("createdAt", "downvotes", "id", "name", "price", "storeId", "updatedAt", "upvotes") SELECT "createdAt", "downvotes", "id", "name", "price", "storeId", "updatedAt", "upvotes" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
