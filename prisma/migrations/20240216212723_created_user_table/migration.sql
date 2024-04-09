-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "refCount" INTEGER NOT NULL DEFAULT 0,
    "userLiked" BOOLEAN NOT NULL DEFAULT false,
    "userQuoted" BOOLEAN NOT NULL DEFAULT false,
    "userFollowed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
