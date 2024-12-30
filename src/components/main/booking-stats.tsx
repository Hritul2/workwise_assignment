interface BookingStatsProps {
  bookedSeatsCount: number;
  availableSeats: number;
}

const BookingStats: React.FC<BookingStatsProps> = ({
  bookedSeatsCount,
  availableSeats,
}) => {
  return (
    <div className="flex gap-4 mt-4">
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
