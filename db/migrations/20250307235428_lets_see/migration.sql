/*
  Warnings:

  - You are about to drop the `_ItemToList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItemToList";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ItemList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ItemList_A_fkey" FOREIGN KEY ("A") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ItemList_B_fkey" FOREIGN KEY ("B") REFERENCES "List" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemList_AB_unique" ON "_ItemList"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemList_B_index" ON "_ItemList"("B");
