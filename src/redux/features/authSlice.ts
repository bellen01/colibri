import { createSlice } from "@reduxjs/toolkit";

type InitialStateAuth = {
    isLoggedIn: boolean,
    name: string,
};

const initialState: InitialStateAuth = {
    isLoggedIn: false,
    name: "",
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
            state.name = action.payload;
        },
        logOut: () => {
            return initialState;
        }
    },
});

export const { isUserLoggedIn, logIn, logOut } = authSlice.actions;
export default authSlice.reducer;