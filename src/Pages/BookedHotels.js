import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../components/useFetch';
import Process from '../components/Process';
import "../css/components.css";

function BookedRooms() {
    const navigate = useNavigate();
    const { isLoggedIn } = Process();
    const { data: orders, isPending, error } = useFetch('//localhost:8989/orders');
    const { data: hotels } = useFetch('//localhost:8989/hotels');
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (orders && hotels && userId) {
            const userOrders = orders
                .filter(order => order.userId === userId)
                .map(order => ({
                    ...order,
                    hotelName: hotels.find(hotel => hotel.id === order.hotelId)?.name || 'Unknown Hotel'
                }));
            setFilteredOrders(userOrders);
        }
    }, [orders, hotels, isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return (
            <div className="alert alert-warning" role="alert">
                <strong>Perhatian!</strong> Silakan login untuk melanjutkan.
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
            </div>
        );
    }

    if (isPending) return <div>Memuat data...</div>;
    if (error) return <div>Kesalahan: {error}</div>;

    return (
        <div>
        <div style={{
            marginTop: '100px',
            marginBottom: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {orders && (
                <div style={{
                    textAlign: 'center',
                    width: '80%',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    backgroundColor: 'white',
                    borderRadius: '10px'
                }}>
                    <h2>Kamar yang Anda Pesan</h2>
                    {filteredOrders.length > 0 ? (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start'
                        }}>
                            {filteredOrders.map(order => (
                                <div key={order.orderId} style={{
                                    padding: '10px',
                                    borderBottom: '1px solid #eee',
                                    marginTop: '10px',
                                    width: '100%'
                                }}>
                                    <span style={{ fontWeight: 'bold' }}>ID Pemesanan: {order.orderId}</span>
                                    <div style={{ fontSize: 'smaller', fontStyle: 'italic', paddingBottom: '5px' }}>
                                        Hotel: {order.hotelName}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'start',
                                        marginTop: '10px'
                                    }}>
                                        {Object.entries(order.roomCount).map(([roomName, count]) => (
                                            <div key={roomName} style={{
                                                margin: '5px',
                                                padding: '10px 20px',
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '5px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <strong>{roomName}</strong>: {count}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Tidak ada pemesanan ditemukan.</p>
                    )}
                </div>
            )}
        </div>
        <div
            style={{height: "12vh"}}
        ></div>
        </div>
    );
}

export default BookedRooms;
