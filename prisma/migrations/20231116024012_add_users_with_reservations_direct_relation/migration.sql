-- CreateTable
CREATE TABLE "_ReservationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToUser_AB_unique" ON "_ReservationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToUser_B_index" ON "_ReservationToUser"("B");

-- AddForeignKey
ALTER TABLE "_ReservationToUser" ADD CONSTRAINT "_ReservationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationToUser" ADD CONSTRAINT "_ReservationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Populate data in new table
INSERT INTO "_ReservationToUser" ("A", "B")
SELECT
    r1.id,
    r1.artist_id
FROM
    reservations r1
JOIN
    reservations r2 ON r1.requested_by_id = r2.requested_by_id
WHERE
    r1.id < r2.id -- Ensures only unique pairs are selected

UNION ALL

SELECT
    r1.id,
    r2.artist_id
FROM
    reservations r1
JOIN
    reservations r2 ON r1.requested_by_id = r2.requested_by_id
WHERE
    r1.id < r2.id;