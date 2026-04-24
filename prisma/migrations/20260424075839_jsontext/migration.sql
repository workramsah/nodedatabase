-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "comptext" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jsons" (
    "id" SERIAL NOT NULL,
    "compjson" TEXT NOT NULL,

    CONSTRAINT "Jsons_pkey" PRIMARY KEY ("id")
);
