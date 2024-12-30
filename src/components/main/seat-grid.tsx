import React from "react";

interface Seat {
  id: string;
  seatNumber: number;
  isBooked: boolean;
}

interface SeatGridProps {
  seats: Seat[];
  totalSeats: number;
  seatsPerRow: number;
  onSeatClick?: (seat: Seat) => void;
}

const SeatGrid = ({
  seats,
  totalSeats,
  seatsPerRow,
  onSeatClick,
}: SeatGridProps) => {
  const totalRows = Math.ceil(totalSeats / seatsPerRow);

  const getSeatColor = (isBooked: boolean) => {
    return isBooked
      ? "bg-amber-500 hover:bg-amber-600"
      : "bg-green-500 hover:bg-green-600";
  };

  const generateSeats = () => {
    const seatElements = [];
    let currentSeat = 0;

    for (let row = 0; row < totalRows; row++) {
      const isLastRow = row === totalRows - 1;
      const seatsInThisRow = isLastRow
        ? totalSeats % seatsPerRow || seatsPerRow
        : seatsPerRow;

      const rowSeats = [];
      for (let seat = 0; seat < seatsInThisRow; seat++) {
        if (currentSeat < seats.length) {
          const seatData = seats[currentSeat];
          rowSeats.push(
            <button
              key={seatData.id}
              onClick={() => onSeatClick?.(seatData)}
              disabled={seatData.isBooked}
              className={`
                ${getSeatColor(seatData.isBooked)}
                rounded-lg px-4 py-2 m-1
                transition-colors duration-200
                text-white font-medium
                shadow-md hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-green-500
                disabled:opacity-70 disabled:cursor-not-allowed
                min-w-[3rem]
              `}
              aria-label={`Seat ${seatData.seatNumber} ${
                seatData.isBooked ? "(Booked)" : "(Available)"
              }`}
            >
              {seatData.seatNumber}
            </button>
          );
          currentSeat++;
        }
      }

      seatElements.push(
        <div key={row} className="flex justify-center flex-wrap mb-4">
          {rowSeats}
        </div>
      );
    }
    return seatElements;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="mb-6 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>
      {generateSeats()}
    </div>
  );
};

export default SeatGrid;
