import { produce } from "immer"; // to be able to push object to array

export const createReceiptSlice = (set, get) => ({
    receipt: [],

    clearCart: () =>{
        set(() => ({ cartData: [] }));
    },
    createReceipt: () => {
        set(produce((state) => {
            state.receipt.push(get().cartData); 
        }));
        get().clearCart();
    },
});