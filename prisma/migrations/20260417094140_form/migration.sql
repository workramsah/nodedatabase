-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "fristname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companysize" INTEGER NOT NULL,
    "overview" TEXT NOT NULL,
    "refund" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
