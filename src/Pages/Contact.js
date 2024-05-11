import React from 'react';
import '../css/components.css';

function Contact() {
  return (
    <div>
    <div className="contact-container">
      <div className="contact-info">
        <h1>Hubungi Kami</h1>
        <p>Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami.</p>
        <div className="info">
          <div className="info-item">
            <h2>Alamat</h2>
            <p>Jl. Jalan Hotelku No. 123</p>
            <p>Kota, Provinsi</p>
            <p>Kode Pos: 12345</p>
          </div>
          <div className="info-item">
            <h2>Telepon</h2>
            <p>+62 123 456 789</p>
          </div>
          <div className="info-item">
            <h2>Email</h2>
            <p>info@hotelku.com</p>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <h1>Kirim Pesan</h1>
        <form>
          <input type="text" placeholder="Nama" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Pesan"></textarea>
          <button type="submit">Kirim</button>
        </form>
      </div>
    </div>
    <div
        style={{height: "20vh"}}
    ></div>
    </div>
  );
}

export default Contact;
