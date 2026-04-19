-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyname" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "sector" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
