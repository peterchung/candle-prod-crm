-- CreateTable
CREATE TABLE "Fragrances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL,
    "updatedDate" DATETIME NOT NULL,
    "imageURL" TEXT NOT NULL
);
