// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/components.css';
import NavbarContent from './NavbarContent';


function NavBar() {

  return (
    <nav className="mainNavbar mb-3">
      <Link to="/" className="mainNavbar-brand">Hotelku</Link>
      <ul className="nav-links">
        <li className="mainNavbar-li"><Link to="/">Beranda</Link></li>
        <li className="mainNavbar-li"><Link to="/about">Tentang</Link></li>
        <li className="mainNavbar-li"><Link to="/order">Pesan Kamar</Link></li>
        <li className="mainNavbar-li"><Link to="/services">Layanan</Link></li>
        <li className="mainNavbar-li"><Link to="/contact">Kontak</Link></li>
        <li className="mainNavbar-li dropdown">
          <a href="#" className="dropbtn">Akun</a>
          <NavbarContent />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
