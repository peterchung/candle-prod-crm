/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Fragrances` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fragrances" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "item" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "createdDate" TEXT,
    "updatedDate" TEXT,
    "imageUrl" TEXT
);
INSERT INTO "new_Fragrances" ("category", "createdDate", "description", "id", "item", "updatedDate") SELECT "category", "createdDate", "description", "id", "item", "updatedDate" FROM "Fragrances";
DROP TABLE "Fragrances";
ALTER TABLE "new_Fragrances" RENAME TO "Fragrances";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
