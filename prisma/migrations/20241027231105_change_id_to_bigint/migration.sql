/*
  Warnings:

  - The primary key for the `Fragrances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Fragrances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fragrances" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "item" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "createdDate" DATETIME,
    "updatedDate" DATETIME,
    "imageURL" TEXT
);
INSERT INTO "new_Fragrances" ("category", "createdDate", "description", "id", "imageURL", "item", "updatedDate") SELECT "category", "createdDate", "description", "id", "imageURL", "item", "updatedDate" FROM "Fragrances";
DROP TABLE "Fragrances";
ALTER TABLE "new_Fragrances" RENAME TO "Fragrances";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
