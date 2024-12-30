import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Rows configuration
  const rows = 12; // Total number of rows (11 full rows + 1 last row)
  const seatsPerRow = 7;

  // Seed seats
  let seatCounter = 1;
  const seats = [];
  for (let rowNumber = 1; rowNumber <= rows; rowNumber++) {
    const seatsInThisRow = rowNumber === rows ? 3 : seatsPerRow;

    for (let seatNumber = 1; seatNumber <= seatsInThisRow; seatNumber++) {
      seats.push({
        seatNumber: seatCounter,
        rowNumber,
      });
      seatCounter++;
    }
  }

  // Insert seats into the database
  for (const seat of seats) {
    await prisma.seat.create({
      data: {
        seatNumber: seat.seatNumber,
        rowNumber: seat.rowNumber,
        isBooked: false,
      },
    });
  }

  console.log(`Seeded ${seats.length} seats successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
