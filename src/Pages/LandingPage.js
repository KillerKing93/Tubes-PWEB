import React from 'react'
import { Link } from 'react-router-dom';
import '../css/components.css';

function LandingPage() {
  return (
    <div>
    <div className='landingPage'>
    <h2 className='landingPage-h2'>Selamat Datang di Hotelku</h2>
      <p className='landingPage-p'>Nikmati kenyamanan luar biasa selama menginap.</p>
      <Link to="/order">
        <button className='landingPageButton'>Pesan Kamar</button>
      </Link>
    </div>
    <div
        style={{height: "1vh"}}
    ></div>
    </div>
    )
}

export default LandingPage