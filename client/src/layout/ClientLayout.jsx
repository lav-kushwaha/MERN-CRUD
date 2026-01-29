import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Clientlayout = () => {
  return (
    <>
        <header className='mb-2'>
          <Header/>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
    </>
  )
}

export default Clientlayout