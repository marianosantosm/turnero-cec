import React, { useState } from 'react';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleAddBooking = (booking) => {
    setBookings([...bookings, booking]);
    // Mostrar el mensaje de aviso después de agregar la reserva
    alert(`Reserva confirmada para el día ${booking.selectedDate.toDateString()} a las ${booking.timeSlot}`);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filtrar las reservas según la fecha seleccionada
  const filteredBookings = bookings.filter(
    (booking) => booking.selectedDate.toDateString() === selectedDate.toDateString()
  );
  filteredBookings.sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

  return (
    <div>
      <img src="logopap.png" alt="Mi Logo" className="logo" />
      <h1>Reserva de Turnos</h1>
      <BookingForm onAddBooking={handleAddBooking} selectedDate={selectedDate} bookings={bookings} />
      <div className="calendar-wrapper">
        <h2>Fechas disponibles</h2>
        <Calendar value={selectedDate} onChange={handleDateChange} minDate={today} />
      </div>
      <div className="booking-list-wrapper">
        <h2>Reservas para la fecha seleccionada:</h2>
        <BookingList bookings={filteredBookings} />
      </div>
    </div>
  );
};

export default App;

