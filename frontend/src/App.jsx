import React, { useContext } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './components/Nav.jsx'
import { userDataContext } from './context/UserContex.jsx'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
// Import your React component for Collection here (not mongoose)
import Collection from './pages/Collections.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Order from './pages/Order.jsx'
import NotFound from './pages/NotFound.jsx'
import Ai from './components/Ai.jsx'

const App = () => {
  const { userData } = useContext(userDataContext)
  let location = useLocation()

  return (
    <>
      {userData && <Nav />}
      <Routes>
        <Route
          path='/login'
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Login />
            )
          }
        />
        <Route 
          path='/' 
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          } 
        />
        <Route
          path='/signup'
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Registration />
            )
          }
        />
        <Route
          path='/about'
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path='/collections'
          element={
            userData ? (
              <Collection />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path='/product'
          element={
            userData ? (
              <Product />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path='/contact'
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />

         <Route
          path='/productdetail/:productId'
          element={
            userData ? (
              <ProductDetail/>
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />


         <Route
          path='/cart'
          element={
            userData ? (
              <Cart/>
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
          <Route
          path='/placeorder'
          element={
            userData ? (
              <PlaceOrder/>
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
           <Route
          path='/order'
          element={
            userData ? (
              <Order/>
            ) : (
              <Navigate to='/login' state={{ from: location.pathname }} />
            )
          }
        />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Ai/>
    </>
  )
}

export default App
