import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import PageNotFound from './components/pagenotfound';
import Signup from './components/signup';
import Navbar from './components/navbar';
import Home from './components/home';
import DoctorPage from './components/doctor';
import MedicinePage from './components/medicine';
import MyOrders from './components/order';
import CartPage from './components/cart';

function App() {
  return( 
    <div >
      <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/order' element={<MyOrders/>}/>
        <Route path='/medicine' element={<MedicinePage/>}/>
        <Route path='/doctor' element={<DoctorPage/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </>
    </div>
  )
}

export default App;

