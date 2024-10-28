-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fragrances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
