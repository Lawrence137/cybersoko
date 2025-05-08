import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './App.css'
import Login from './pages/auth/Login'; // Import Login
import Signup from './pages/auth/Signup'; // Import Signup

// Component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? '' : 'mt-14 flex-grow'}>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-[100dvh] w-full bg-gray-900 flex flex-col">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} /> {/* Add Login route */}
              <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
            </Routes>
          </Layout>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;