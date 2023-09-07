import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
//persist
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "./customStorage";

const persistConfig = {
    key: "root",
    storage: storage,
}

const rootReducer = combineReducers({
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
});

//som det var innan, utan persist
// export const store = configureStore({
//     reducer: {
//         cart: cartReducer,
//     },
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;