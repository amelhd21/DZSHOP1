import {GoogleOAuthProvider} from '@react-oauth/google'
import Navbar from './navbar.jsx'
import './navbar.css'
import './App.css'
import Piedpage from './footer.jsx'
import './footer.css'
import ProductList from './produit.jsx'
import "./product.css"
import Dashboard from "./dactboard.jsx"
import "./Dashboard.css"
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom'
import ProductDetailPage from './DetailProductPage.jsx'
import { CartProvider } from './contexte/CartContext'
import Panier from './panier.jsx'
import "./panier.css"
import RegisterPage from './RegisterPage.jsx'
import "./RegisterPage.css"
import { AuthProvider } from './contexte/AuthContext.jsx'
import LoginPage from './LoginPage.jsx'
import "./LoginPage.css"
import PrivateRoute from './PrivateRoute.jsx'
import Checkout from './CheckoutPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AdminRoute from "./components/AdminRoute.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import AdminProducts from "./pages/AdminProducts.jsx"
import AdminOrders from "./pages/AdminOrders.jsx"
import AdminCustomers from "./pages/AdminCustomers.jsx"
import AdminStats from "./pages/AdminStats.jsx"
import AdminUsers from './pages/AdminUsers.jsx'

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith("/admin")

  return (
    <>
      {!isAdminPage && <Navbar/>}

      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/products/:id' element={<ProductDetailPage/>}/>
        <Route path="/panier" element={<Panier/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
        <Route path="/admin/products" element={<AdminRoute><AdminProducts/></AdminRoute>}/>
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders/></AdminRoute>}/>
        <Route path="/admin/customers" element={<AdminRoute><AdminCustomers/></AdminRoute>}/>
        <Route path="/admin/stats" element={<AdminRoute><AdminStats/></AdminRoute>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/admin/users" element={<AdminRoute><AdminUsers/></AdminRoute>}/>
      </Routes>

      {!isAdminPage && <Piedpage/>}
    </>
  )
}

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App