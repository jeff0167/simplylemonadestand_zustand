import axios from 'axios';
import { create } from 'zustand';
import { produce } from "immer"; // to be able to push object to array
//import { createCartSlice } from './slices/cartSlice';
//import { createReceiptSlice } from './slices/receiptSlice';

const url = "https://www.fruitmap.org/api/trees";

const useStore = create((set, get) => ({
    loading: false,
    hasErrors: false,
    errorMessage: "no error",

    //...createCartSlice(set, get),
    //...createReceiptSlice(set, get),

    drinksData: [], // comment out for slice
    cartData: [],
    receipt: [],    // comment out for slice

    getDrinksData: async () => {
        set(() => ({ loading: true }));
        try {
            const response = await axios.get(url);
            set((state) => ({
                drinksData: (state.drinksData = response.data), 
                loading: false
            }));
        } catch (err) {
            set(() => ({ hasErrors: true, loading: false, errorMessage: err.message }));
        }
    },
    addDrinkToCart: (product) => {
        set(produce((state) => {
            state.cartData.push(product); 
        }));
    },
    removeDrinkFromCart: (product) => {
        set(produce((state) => {
            const index = get().cartData.findIndex((x) => x.id == product.id);
            state.cartData.splice(index, 1);
        }));
    },
    clearCart: () =>{
        set(() => ({ cartData: [] }));
    },
    createReceipt: () => {
        set(produce((state) => {
            state.receipt.push(get().cartData); 
        }));
        get().clearCart();
    },
}));

export default useStore;