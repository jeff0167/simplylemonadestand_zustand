import axios from 'axios';
import { produce } from "immer"; // to be able to push object to array

const url = "https://www.fruitmap.org/api/trees";

export const createCartSlice = (set, get) => ({
    drinksData: [],

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
    }
});