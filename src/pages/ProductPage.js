import "../App.css";
import { useEffect } from "react";
import useStore from '../store/store.js';
import grape from "../images/Grapes.jpg";
import products from "../data/productListData";

function ProductPage() {
  const drinks  = useStore((state) => state.drinksData);
  const getDrinks = useStore((state) => state.getDrinksData);
  const addToCart = useStore((state) => state.addDrinkToCart);
  const removeFromCart = useStore((state) => state.removeDrinkFromCart);
  const cart = useStore((state) => state.cartData);

  useEffect(() => {
    getDrinks();
  }, []);

  const hasInCart = (drinkId) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === drinkId) return true;
    }
    return false;
  };

  const getAmount = (drinkId) => {
    let amount = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === drinkId) {
        amount++;
      }
    }
    return amount;
  };

  // from the id, return the image and price
  const getImage = (productId) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) return products[i].imagePath;
    }
    return grape;
  };
  const getPrice = (productId) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) return products[i].price;
    }
    return 5;
  };
  const exist = (productId) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) return true;
    }
    return false;
  };

  const getProduct = (drinkId) => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === drinkId) return products[i];
    }
    return products[0]; // I have a project where I simply tried out redux toolkkit with slices, find it
  };

  const handleProductAdd = (val) => {
    addToCart(val);
  };
  const handleProductRemove = (val) => {
    removeFromCart(val);
  };

  let content = drinks?.map((drink, id) => {
    if (exist(drink.id)) return show(drink, id);
  });

  function show(drink, id) {
    let button;
    if (!hasInCart(drink.id))
      button = (
        <div>
          <button
            onClick={() => handleProductAdd(getProduct(drink.id))} className="bg-blue-700 mx-8 rounded-md hover:bg-blue-600 p-2">Add
          </button>
        </div>
      );
    else
      button = (
        <div>
          <button onClick={() => handleProductAdd(getProduct(drink.id))}
            className="bg-blue-700 mr-2 rounded-md hover:bg-blue-600 p-2">Add
          </button>
          <button
            onClick={() => handleProductRemove(getProduct(drink.id))} className="bg-rose-800 ml-2 rounded-md hover:bg-rose-600 p-2">Remove
          </button>
          <p className="text-sm">Already {getAmount(drink.id)}x in cart</p>
        </div>
      );
    return (
      <div className=" border-black imageZoom" key={id}>
        <img
          className="object-contain rounded-s-xl h-48"
          src={getImage(drink.id)}
        ></img>
        <p>{drink.name}</p>
        {button}
        <p>Price: {getPrice(drink.id)}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Product Page</h1>
      <div className="grid grid-rows-2 grid-flow-col gap-10">{content}</div>
    </div>
  );
}

export default ProductPage;
