import { createSlice } from "@reduxjs/toolkit";

type InitialStateAuth = {
    isLoggedIn: boolean,
};

const initialState: InitialStateAuth = {
    isLoggedIn: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isUserLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        logIn: (state, action) => {
            state.isLoggedIn = true;
        },
        logOut: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
});

export const { isUserLoggedIn, logIn, logOut } = authSlice.actions;
export default authSlice.reducer;