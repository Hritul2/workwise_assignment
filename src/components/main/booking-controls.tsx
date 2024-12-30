import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Define the validation schema
const bookingSchema = z.object({
  numberOfSeats: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a number")
    .refine((val) => {
      const num = Number(val);
      return num >= 1 && num <= 7;
    }, "Number of seats must be between 1 and 7"),
});

// Infer the type from the schema
type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingControlsProps {
  setNumberOfSeats: (value: string) => void;
  handleBook: () => void;
  handleReset: () => void;
  isBooking: boolean;
  isResetting: boolean;
  error?: string;
}

const BookingControls = ({
  setNumberOfSeats,
  handleBook,
  handleReset,
  isBooking,
  isResetting,
  error,
}: BookingControlsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numberOfSeats: "",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    setNumberOfSeats(data.numberOfSeats);
    handleBook();
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Book Seats</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfSeats">Number of Seats</Label>
          <Input
            id="numberOfSeats"
            type="number"
            {...register("numberOfSeats")}
            className="w-full"
            placeholder="Enter seats (1-7)"
          />
          {errors.numberOfSeats && (
            <p className="text-sm text-red-500">
              {errors.numberOfSeats.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isBooking}
          className="w-full bg-blue-500 text-white py-2 rounded mb-2 hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isBooking ? "Booking..." : "Book"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isResetting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isResetting ? "Resetting..." : "Reset Booking"}
        </button>

        {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  );
};

export default BookingControls;
