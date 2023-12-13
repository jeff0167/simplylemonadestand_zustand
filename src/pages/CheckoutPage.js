import '../App.css';
import useStore from '../store/store.js';
import ProductList from '../components/product_list';

 function CheckoutPage() {
  const receipt = useStore((state) => state.receipt);

  const getTotalPrice = (currentCart) =>{
    let price = 0;
    for(let i=0; i< currentCart.length; i++){
      price += currentCart[i].price;
    }
    return price;
  }

  let content = receipt.map((cart, id)=>{
    let list = <ProductList cart={cart}></ProductList>
    return <div className='border-2' key={id}>{list}<h1>Total price {getTotalPrice(cart)}</h1></div>
  })

  return (
    <div>
      <h1>Checkout Page</h1>
      <div className='grid grid-rows-1 grid-flow-col gap-4'>
        {content}
      </div>
    </div>
  );
 }

export default CheckoutPage;