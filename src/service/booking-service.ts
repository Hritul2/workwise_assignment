import { db } from "@/utils/db";

interface BookSeatsParams {
  userId: string;
  numberOfSeats: number;
}

export class BookingService {
  // Helper function to get all seats in a specific row
  private async getAvailableSeatsInRow(rowNumber: number): Promise<
    {
      id: string;
      seatNumber: number;
      rowNumber: number;
      isBooked: boolean;
      bookingId: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const availableSeatsInRow = await db.seat.findMany({
      where: {
        rowNumber,
        isBooked: false,
      },
      orderBy: {
        seatNumber: "asc",
      },
    });
    if (availableSeatsInRow.length === 0) {
      return [];
    }
    return availableSeatsInRow;
  }

  // Helper function to find best available row
  private async findBestAvailableRow(
    numberOfSeats: number
  ): Promise<number | null> {
    const totalRows = 12; // 11 rows of 7 seats + 1 row of 3 seats

    for (let rowNumber = 1; rowNumber <= totalRows; rowNumber++) {
      const availableSeats = await this.getAvailableSeatsInRow(rowNumber);
      const seatsInThisRow = rowNumber === totalRows ? 3 : 7;

      if (
        availableSeats.length >= numberOfSeats &&
        availableSeats.length <= seatsInThisRow
      ) {
        return rowNumber;
      }
    }
    return null;
  }

  // Main booking function
  async bookSeats({ userId, numberOfSeats }: BookSeatsParams) {
    if (numberOfSeats > 7) {
      throw new Error("Cannot book more than 7 seats at once");
    }

    try {
      return await db.$transaction(async (tx) => {
        // First try to find seats in a single row
        const bestRow = await this.findBestAvailableRow(numberOfSeats);
        let bookedSeats = [];

        if (bestRow) {
          // Book seats in the same row
          const availableSeats = await tx.seat.findMany({
            where: {
              rowNumber: bestRow,
              isBooked: false,
            },
            orderBy: {
              seatNumber: "asc",
            },
            take: numberOfSeats,
          });

          // Create booking
          const booking = await tx.booking.create({
            data: {
              userId,
            },
          });

          // Update seats
          bookedSeats = await Promise.all(
            availableSeats.map((seat) =>
              tx.seat.update({
                where: { id: seat.id },
                data: {
                  isBooked: true,
                  bookingId: booking.id,
                },
              })
            )
          );
        } else {
          // If no single row available, book nearest available seats
          const availableSeats = await tx.seat.findMany({
            where: {
              isBooked: false,
            },
            orderBy: [{ rowNumber: "asc" }, { seatNumber: "asc" }],
            take: numberOfSeats,
          });

          if (availableSeats.length < numberOfSeats) {
            throw new Error("Not enough seats available");
          }

          // Create booking
          const booking = await tx.booking.create({
            data: {
              userId,
            },
          });

          // Update seats
          bookedSeats = await Promise.all(
            availableSeats.map((seat) =>
              tx.seat.update({
                where: { id: seat.id },
                data: {
                  isBooked: true,
                  bookingId: booking.id,
                },
              })
            )
          );
        }

        return bookedSeats;
      });
    } catch (error: any) {
      throw new Error(`Booking failed: ${error.message}`);
    }
  }

  async resetAllBookings() {
    try {
      return await db.$transaction(async (tx) => {
        // Reset all seats
        await tx.seat.updateMany({
          data: {
            isBooked: false,
            bookingId: null,
          },
        });

        // Delete all bookings
        await tx.booking.deleteMany({});

        return { message: "All bookings reset successfully" };
      });
    } catch (error: any) {
      throw new Error(`Reset failed: ${error.message}`);
    }
  }

  async getSeats() {
    try {
      const seats = await db.seat.findMany({
        orderBy: {
          seatNumber: "asc",
        },
      });
      return seats;
    } catch (error: any) {
      throw new Error("Failed to fetch seats: " + error.message);
    }
  }
}
