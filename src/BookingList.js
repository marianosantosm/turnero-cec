// components/BookingList.js
import React from 'react';
import Player from './Player';
import './App.css'; // Importa el archivo CSS

const BookingList = ({ bookings }) => {
  return (
    <div>
      <h2>Lista de Reservas:</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr className="booking-item" key={index}>
              <td><Player name={booking.playerName} /></td>
              <td>{booking.timeSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;

