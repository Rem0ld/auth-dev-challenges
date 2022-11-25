/*
  Warnings:

  - Changed the type of `refresh_token` on the `refresh_token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "refresh_token" DROP COLUMN "refresh_token",
ADD COLUMN     "refresh_token" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;
