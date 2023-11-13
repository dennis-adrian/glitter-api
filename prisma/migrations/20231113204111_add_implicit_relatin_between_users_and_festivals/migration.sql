-- CreateTable
CREATE TABLE "_FestivalToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FestivalToUser_AB_unique" ON "_FestivalToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FestivalToUser_B_index" ON "_FestivalToUser"("B");

-- AddForeignKey
ALTER TABLE "_FestivalToUser" ADD CONSTRAINT "_FestivalToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "festivals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FestivalToUser" ADD CONSTRAINT "_FestivalToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
