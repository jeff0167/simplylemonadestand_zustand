import { create } from 'zustand';
import axios from 'axios';
import { produce } from "immer"; // to be able to push object to array

const url = "https://www.fruitmap.org/api/trees";

const useStore = create((set, get) => ({
    loading: false,
    hasErrors: false,
    errorMessage: "no error",

    drinksData: [],
    cartData: [],

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
            const index = state.cartDate.indexOf(product.id);
            state.cartData = state.cartData.splice(index, 1);
        }));
    },
    clearCart: () =>{
        set(() => ({ cartData: [] }));
    }
}));

export default useStore;