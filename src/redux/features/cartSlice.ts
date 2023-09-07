import { CartProduct } from "@/types/CartProduct.types";
import { createSlice, current } from "@reduxjs/toolkit";


type InitialStateProducts = {
    products: CartProduct[],
    cartTotalQuantity: number,
    cartTotalAmount: number,
};

const initialState: InitialStateProducts = {
    products: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item) {
                item.quantity += action.payload.quantity;
                item.totalPrice += action.payload.priceAndSize.price;
                state.cartTotalQuantity += 1;
                state.cartTotalAmount += action.payload.priceAndSize.price;
            } else {
                state.products.push(action.payload);
                state.cartTotalQuantity += 1;
                state.cartTotalAmount += action.payload.priceAndSize.price;
            }
        },
        removeItem: (state, action) => {
            console.log('action payload', action.payload)
            // state.products = state.products.splice(state.products.findIndex(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size), 1); //fungerar inte
            state.products.splice(state.products.findIndex(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size), 1);
            state.cartTotalQuantity -= action.payload.quantity;
            state.cartTotalAmount -= action.payload.totalPrice;
        },
        decreaseCartItem: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.cartTotalQuantity -= 1;
                item.totalPrice -= action.payload.priceAndSize.price;
                state.cartTotalAmount -= action.payload.priceAndSize.price;
            } else if (item && item.priceAndSize.size === action.payload.priceAndSize.size && item.quantity === 1) {
                state.products.splice(state.products.findIndex(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size), 1);
                state.cartTotalQuantity -= 1;
                state.cartTotalAmount -= action.payload.priceAndSize.price;
            }
        },
        increaseCartItem: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id && item.priceAndSize.size === action.payload.priceAndSize.size);
            if (item) {
                item.quantity += 1;
                state.cartTotalQuantity += 1;
                item.totalPrice += action.payload.priceAndSize.price;
                state.cartTotalAmount += action.payload.priceAndSize.price;
            }
        },
        resetCart: (state, action) => {
            state.products = [],
                state.cartTotalAmount = 0,
                state.cartTotalQuantity = 0
        },
    },
});

export const { addToCart, removeItem, resetCart, decreaseCartItem, increaseCartItem } = cartSlice.actions;
export default cartSlice.reducer;