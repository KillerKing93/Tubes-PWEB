import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/components.css'

function MainLayout({css, children}) {
  return (
    <div className={css}>
        <NavBar />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout