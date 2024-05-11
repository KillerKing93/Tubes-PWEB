import React, { useState } from 'react';
import '../css/components.css';
import useFetch from '../components/useFetch';

function Services() {
    const {data: orders} = useFetch('//localhost:8989/orders');
    const { data: hotels } = useFetch('//localhost:8989/hotels');
    const [searchId, setSearchId] = useState('');
    const [filteredOrder, setFilteredOrder] = useState(null);

    const handleSearch = () => {
        const foundOrder = orders?.find(order => order.orderId === parseInt(searchId));
        if (foundOrder) {
            const hotelName = hotels?.find(hotel => hotel.id === foundOrder.hotelId)?.name;
            setFilteredOrder({...foundOrder, hotelName: hotelName});
        } else {
            setFilteredOrder(null);
        }
    };

    return (
      <div>
        <div className="services-container">
            <h1>Daftar Pesanan</h1>
            <div className="search-container">
                <input 
                    type="number"
                    className="search-input"
                    placeholder="Cari ID Pesanan..."
                    value={searchId}
                    onChange={e => setSearchId(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Cari</button>
            </div>
            {filteredOrder ? (
                <div className="order-item">
                    <h2>Pesanan #{filteredOrder.orderId}</h2>
                    <p><strong>Nama:</strong> {filteredOrder.customerData.name}</p>
                    <p><strong>Email:</strong> {filteredOrder.customerData.email}</p>
                    <p><strong>No. KTP:</strong> {filteredOrder.customerData.ktp}</p>
                    <p><strong>Hotel:</strong> {filteredOrder.hotelName}</p>
                    <p><strong>Detail Kamar:</strong></p>
                    <ul>
                        {Object.entries(filteredOrder.roomCount).map(([roomType, count]) => (
                            <li key={roomType}>{roomType.charAt(0).toUpperCase() + roomType.slice(1)}: {count}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="no-data">Jika ID pesanan valid dimasukkan, detail pesanan akan ditampilkan di sini.</p>
            )}
        </div>
        <div
            style={{height: "35vh"}}
        ></div>
        </div>
    );
}

export default Services;
