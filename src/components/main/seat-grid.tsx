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
}

const SeatGrid: React.FC<SeatGridProps> = ({
  seats,
  totalSeats,
  seatsPerRow,
}) => {
  const totalRows = Math.ceil(totalSeats / seatsPerRow);

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
            <div
              key={seatData.id}
              className={`${
                seatData.isBooked ? "bg-amber-300" : "bg-green-500"
              } rounded-lg px-4 py-2 text-center m-1 shadow-md`}
            >
              {seatData.seatNumber}
            </div>
          );
          currentSeat++;
        }
      }

      seatElements.push(
        <div key={row} className="flex justify-start mb-2">
          {rowSeats}
        </div>
      );
    }
    return seatElements;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">{generateSeats()}</div>
  );
};

export default SeatGrid;
