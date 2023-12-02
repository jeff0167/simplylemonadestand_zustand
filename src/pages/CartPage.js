import '../App.css';
import { useState } from 'react';
import useStore from '../store/store.js';
import Popup from "../components/popup";
import ProductList from '../components/product_list';

 function CartPage() {
  const cart = useStore((state) => state.cartData);
  const createReceipt = useStore((state) => state.createReceipt);
  const [openPopover, setOpenPopover] = useState(false);

  const getTotalPrice = () =>{
    let price = 0;
    for(let i=0; i<cart.length; i++){
      price += cart[i].price;
    }
    return price;
  }
  
  const confirmPurchase = () =>{
    if (window.confirm("Are you sure you wanna purchase this product?")) purchase();
  }
  
  const purchase = () =>{
    createReceipt(); // add the cart object to a receipt object array and empty the cart
    setOpenPopover(true);
  }
  
  let pop = <Popup openPopover={openPopover} setOpenPopover={setOpenPopover}></Popup>

  return (
    <div>
      <h1>Cart Page</h1>
      <h1>Total price {getTotalPrice()}</h1>
      <div classNameName='grid grid-rows-1 grid-flow-col gap-4'>
        <ProductList cart={cart}></ProductList>
      </div>
      <div>
      {pop}
        <div>
          <button onClick={() => confirmPurchase()} className='bg-blue-700 mx-8 rounded-md hover:bg-blue-600 p-2'>Pay for products</button>
        </div>
      </div>
    </div>
  );
 }

 export default CartPage;