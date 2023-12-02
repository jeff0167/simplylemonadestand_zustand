import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import CartPage from './pages/CartPage.js';
import ProductPage from './pages/ProductPage'; 
import CheckoutPage from './pages/CheckoutPage';
import { GiCutLemon } from "react-icons/gi";

function App() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path;
    navigate(path);
  }

  return (
    <div className="App">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <GiCutLemon className='lemon h-8 w-auto'></GiCutLemon>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <button className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" onClick={()=> navigate("simplylemonadestand")}>Product Page</button>
                  <button className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" onClick={()=> navigate("simplylemonadestand/cart")}>Cart</button>
                  <button className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" onClick={()=> navigate("simplylemonadestand/checkout")}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Navigate to='/simplylemonadestand' />} />
          <Route path="simplylemonadestand" element={<ProductPage></ProductPage>}></Route>
          <Route path="simplylemonadestand/cart" element={<CartPage></CartPage>}></Route>
          <Route path="simplylemonadestand/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
          <Route path='*' element={<Navigate to='/simplylemonadestand' />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
