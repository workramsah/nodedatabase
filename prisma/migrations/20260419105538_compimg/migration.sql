-- CreateTable
CREATE TABLE "Companys" (
    "id" SERIAL NOT NULL,
    "companyname" TEXT NOT NULL,
    "phone" INTEGER,
    "email" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,

    CONSTRAINT "Companys_pkey" PRIMARY KEY ("id")
);
