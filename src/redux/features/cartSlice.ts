import { addCartItem } from "@/app/cart/fetchFunctionsCart";
import { CartProduct } from "@/types/CartProduct.types";
import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PriceAndSize } from "@/types/Product.types";


type InitialStateProducts = {
    products: CartProduct[],
};

const initialState: InitialStateProducts = {
    products: [],
};

type CartActionType = {
    id: string,
    quantity: number,
    priceAndSize: PriceAndSize
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        updateCartFromDB: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        removeItem: (state, action) => {
            console.log('action payload', action.payload)
            state.products.splice(state.products.findIndex(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size), 1);
        },
        decreaseCartItem: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.priceAndSize.size === action.payload.priceAndSize.size && item.quantity === 1) {
                state.products.splice(state.products.findIndex(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size), 1);
            }
        },
        increaseCartItem: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item) {
                item.quantity += 1;
            }
        },
        resetCart: (state, action) => {
            state.products = []
        },
    },
});

export const { addToCart, removeItem, resetCart, decreaseCartItem, increaseCartItem, updateCartFromDB } = cartSlice.actions;
export default cartSlice.reducer;