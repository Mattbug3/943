//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

import './App.css'
import { useContext } from 'react';
import { Route, BrowserRouter, Navigate, Routes} from "react-router-dom"
import { Navbar } from './components/navbar';
import { Cart } from './pages/cart/cart';
import { Shop } from './pages/shop/shop'
import LayOut from './components/layout';
import { ShopDetails } from './pages/shop/shopDetails';
import { Home } from './pages/homepage/home';
import { Login } from './pages/Authentication/login'
import { Register } from './pages/Authentication/register'
import { AuthContext } from './context/Auth';


 export default function App() {

  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if(!currentUser){
      return <Navigate to='/943/login'/>
    } return children
  }

  return (
    <BrowserRouter>
    <Routes>
    <Route 
        path = '/943' 
        element = {<LayOut /> }
      >

        <Route 
          path='/943'  
          element = { <Home /> } 
        />
    
        <Route 
          path='navbar'  
          element = { <Navbar /> } 
        />
        
          <Route 
            path='cart' 
            element={ 
              <ProtectedRoute>
                <Cart /> 
              </ProtectedRoute>
            }
          />
      
        <Route 
          path='shop'
          element={ <Shop /> }
        />

        <Route 
          path='shop/:id'
          element={ <ShopDetails /> }
        />

        <Route 
          path='login' 
          element={<Login />} 
        />

        <Route 
          path='register' 
          element={<Register />} 
        />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
 
  