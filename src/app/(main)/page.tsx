"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookSeats, resetBookings, getSeats } from "@/actions/booking-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SeatGrid from "@/components/main/seat-grid";
import BookingStats from "@/components/main/booking-stats";
import BookingControls from "@/components/main/booking-controls";

const Home = () => {
  const router = useRouter();
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/sign-in");
  }
  if (!session) {
    router.push("/sign-in");
  }

  const user_id = session?.user?.id ?? "";
  if (user_id === "") {
    router.push("/sign-in");
  }

  const {
    data: seats = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["seats"],
    queryFn: () => getSeats(),
    refetchInterval: 2000,
  });
  const bookMutation = useMutation({
    mutationFn: (seatCount: number) => bookSeats(seatCount, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seats"] });
      setNumberOfSeats("");
    },
  });

  const resetMutation = useMutation({
    mutationFn: () => resetBookings(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seats"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load seats.</p>;

  const handleBook = () => {
    const seatCount = parseInt(numberOfSeats);
    if (seatCount > 0 && seatCount <= 7) {
      bookMutation.mutate(seatCount);
    }
  };

  const handleReset = () => {
    resetMutation.mutate();
  };

  const totalSeats = 80;
  const seatsPerRow = 7;
  const bookedSeatsCount = seats.filter((seat) => seat.isBooked).length;
  const availableSeats = totalSeats - bookedSeatsCount;

  return (
    <div className="mx-auto bg-gray-50 h-full w-full">
      <h1 className="text-2xl font-bold text-center mb-8">Ticket Booking</h1>
      <div className="flex justify-center items-center gap-10">
        <div className="">
          <SeatGrid
            seats={seats}
            totalSeats={totalSeats}
            seatsPerRow={seatsPerRow}
          />
        </div>
        <div className="">
          <BookingControls
            setNumberOfSeats={setNumberOfSeats}
            handleBook={handleBook}
            handleReset={handleReset}
            isBooking={bookMutation.isPending}
            isResetting={resetMutation.isPending}
            error={
              bookMutation.isError ? bookMutation.error.message : undefined
            }
          />
          <BookingStats
            bookedSeatsCount={bookedSeatsCount}
            availableSeats={availableSeats}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
