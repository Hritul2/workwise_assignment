interface BookingStatsProps {
  bookedSeatsCount: number;
  availableSeats: number;
}

const BookingStats = ({
  bookedSeatsCount,
  availableSeats,
}: BookingStatsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <div className="bg-amber-300 px-4 py-2 rounded-lg">
        Booked Seats = {bookedSeatsCount}
      </div>
      <div className="bg-green-500 px-4 py-2 rounded-lg">
        Available Seats = {availableSeats}
      </div>
    </div>
  );
};

export default BookingStats;
