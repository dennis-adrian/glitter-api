-- Fixing one artist reservations
INSERT INTO "_ReservationToUser" ("A", "B")
SELECT r1.id, r1.artist_id
FROM reservations r1
WHERE NOT EXISTS (
    SELECT 1
    FROM reservations r2
    WHERE r1.requested_by_id = r2.requested_by_id
      AND r1.id <> r2.id -- Ensures it's not the same row
);
