import React, { useState, useEffect } from 'react';
import '../css/components.css';
import useFetch from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import Process from '../components/Process';

function Order() {

  const { data: hotels, isPending, error } = useFetch('//localhost:8989/hotels');
  const { isLoggedIn, userId } = Process();  // Dapatkan status login dan informasi pengguna
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [customerData, setCustomerData] = useState({ name: '', email: '', ktp: '' });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [roomCount, setRoomCount] = useState({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {}, [isLoggedIn, userId]);

  const handleRoomCountChange = (roomType, increment) => {
    const updatedRoomCount = { ...roomCount };
    updatedRoomCount[roomType] = (updatedRoomCount[roomType] || 0) + increment;
    setRoomCount(updatedRoomCount);
  };

  const resetForm = () => {
    setSelectedHotel(null);
    setCustomerData({ name: '', email: '', ktp: '' });
    setRoomCount({});
    setOrderComplete(false);
    setShowLoginPrompt(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const uniqueId = Math.floor(Math.random() * 1000000);
    setOrderId(uniqueId);
    const orderData = {
      orderId: uniqueId,
      customerData: { ...customerData },
      hotelId: selectedHotel.id,
      roomCount: roomCount,
      userId: userId  // Kirim user ID yang sedang login
    };
    fetch('http://localhost:8989/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
      setOrderComplete(true);
      console.log('Order saved:', data);
      resetForm();
    })
    .catch(error => console.error('Error saving order:', error));
  };

  return (
    <div>
      {isPending && <div>Loading page...</div>}
      {error && <div>Error loading data.</div>}
      {!isLoggedIn && showLoginPrompt && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between" role="alert">
          <div>
            <strong>Perhatian!</strong> Mohon Login Sebelum Melanjutkan!
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
        </div>      
      )}
      {hotels && (
        <div className="superContainer">
          <div className="container mt-5 mb-5">
            <div className="row">
              {hotels.map(hotel => (
                <div key={hotel.id} className="col-md-4 mb-3">
                  <div className="card">
                    <img src={window.location.origin + hotel.image} className="card-img-top" alt={hotel.name} />
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <p className="card-text">{hotel.description}</p>
                      <p className="card-text">Founded: {hotel.established}</p>
                      <p className="card-text">Location: {hotel.location}</p>
                      <button className="btn btn-primary" onClick={() =>{ setSelectedHotel(hotel); 
                      setShowLoginPrompt(true);
                      }}>
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isLoggedIn && selectedHotel && (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="close-button-container">
                  <button type="button" onClick={resetForm}>X</button>
                </div>
                <h3>Booking for {selectedHotel.name}</h3>
                <div className="form-group">
                  <div className="form-row">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={customerData.name} onChange={e => setCustomerData({...customerData, name: e.target.value})} required />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={customerData.email} onChange={e => setCustomerData({...customerData, email: e.target.value})} required />
                  </div>
                  <div className="form-row">
                    <label htmlFor="ktp">KTP Number</label>
                    <input type="text" id="ktp" value={customerData.ktp} onChange={e => setCustomerData({...customerData, ktp: e.target.value})} required />
                  </div>
                </div>

                <h4>Select Rooms</h4>
                <table className="room-table">
                  <thead>
                    <tr>
                      <th>Room Type</th>
                      <th>Available</th>
                      <th>Booked</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHotel.rooms.map(room => (
                      <tr key={room.roomType}>
                        <td>{room.roomType}</td>
                        <td>{room.available}</td>
                        <td>{roomCount[room.roomType] || 0}</td>
                        <td>
                          <button className="mb-2" type="button" onClick={() => handleRoomCountChange(room.roomType, 1)}>+</button>
                          <button type="button" onClick={() => handleRoomCountChange(room.roomType, -1)} disabled={!roomCount[room.roomType] || roomCount[room.roomType] === 0}>-</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button type="submit" className="btn btn-success mt-3">Book Room!</button>
              </form>
            )}
            {orderComplete && (
              <div className="order-confirmation">
                <div className="close-button-container">
                  <button type="button" onClick={resetForm}>X</button>
                </div>
                <p>Your Order ID: {orderId}</p>
                <button onClick={resetForm}>OK!</button>
              </div>
            )}
          </div>

          <div className='mt-0'>s</div>
        </div>
      )}
      <div
        style={{height: "98vh"}}
    ></div>
    </div>
  );
}

export default Order;
