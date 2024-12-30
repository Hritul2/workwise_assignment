"use server";
import { BookingService } from "@/service/booking-service";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";

const bookingService = new BookingService();

export async function bookSeats(numberOfSeats: number, userId: string) {
  try {
    const bookedSeats = await bookingService.bookSeats({
      userId,
      numberOfSeats,
    });
    revalidatePath("/booking");
    return { success: true, data: bookedSeats };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSeats() {
  try {
    console.log("Fetching seats...");
    const seats = await db.seat.findMany({
      orderBy: {
        seatNumber: "asc",
      },
    });
    console.log("Fetched seats:", seats);
    return seats;
  } catch (error: any) {
    throw new Error("Failed to fetch seats: " + error.message);
  }
}

export async function resetBookings() {
  try {
    await bookingService.resetAllBookings();
    revalidatePath("/booking");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
