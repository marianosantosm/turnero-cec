import React, { useState } from 'react';
import playersData from './playersData';

const BookingForm = ({ onAddBooking, selectedDate, bookings }) => {
  const [playerName, setPlayerName] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handlePlayerChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleTimeSlotChange = (event) => {
    setTimeSlot(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Función para verificar si dos fechas están en la misma semana
    const isSameWeek = (date1, date2) => {
      const firstDayOfWeek = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() - date1.getDay());
      const lastDayOfWeek = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() - date1.getDay() + 6);
      return date2 >= firstDayOfWeek && date2 <= lastDayOfWeek;
    };

    // Verificar si el jugador ya tiene 2 reservas en la semana
    const playerReservationsInWeek = bookings.filter(
      (booking) =>
        booking.playerName === playerName &&
        isSameWeek(new Date(selectedDate), new Date(booking.selectedDate))
    );

    const isTimeSlotAvailable = !bookings.some(
      (booking) =>
        booking.selectedDate.toDateString() === selectedDate.toDateString() &&
        booking.timeSlot === timeSlot
    );

    if (playerName && timeSlot && isTimeSlotAvailable && playerReservationsInWeek.length < 2) {
      onAddBooking({ playerName, timeSlot, selectedDate });
      setPlayerName('');
      setTimeSlot('');
    } else if (!isTimeSlotAvailable) {
      alert('El horario ya ha sido reservado por otro jugador. Por favor, selecciona otro horario.');
    } else if (playerReservationsInWeek.length >= 2) {
      alert('El jugador ya ha alcanzado el límite de 2 reservas por semana.');
    }
  };


  return (
    <div className="booking-form">
      <h2>Reservar Turno:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="player">Seleccionar Jugador:</label>
          <select id="player" value={playerName} onChange={handlePlayerChange}>
            <option value="">Seleccionar jugador</option>
            {playersData.map((player) => (
              <option key={player.id} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeSlot">Seleccionar Horario:</label>
          <select id="timeSlot" value={timeSlot} onChange={handleTimeSlotChange}>
            <option value="">Seleccionar horario</option>
            {/* Aquí puedes agregar los intervalos de horarios */}
            <option value="8:00am">8:00</option>
            <option value="9:00am">9:00</option>
            <option value="10:00am">10:00</option>
            <option value="11:00am">11:00</option>
            <option value="12:00am">12:00</option>
            <option value="13:00pm">13:00</option>
            <option value="14:00pm">14:00</option>
            <option value="15:00pm">15:00</option>
            <option value="16:00pm">16:00</option>
            <option value="17:00pm">17:00</option>
            <option value="18:00pm">18:00</option>
            <option value="19:00pm">19:00</option>
            <option value="20:00pm">20:00</option>
            <option value="21:00pm">21:00</option>
            <option value="22:00pm">22:00</option>
            <option value="23:00pm">23:00</option>
            {/* Agrega más opciones de horarios si es necesario */}
          </select>
        </div>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
};

export default BookingForm;
