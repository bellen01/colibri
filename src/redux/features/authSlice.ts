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
            state.isLoggedIn = false;
        }
    },
});

export const { isUserLoggedIn, logIn, logOut } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type InitialState = {
//     value: AuthState;
// }

// type AuthState = {
//     isAuth: boolean,
//     username: string,
//     uid: string,
//     isModerator: boolean,
// }

// const initialState = {
//     value: {
//         isAuth: false,
//         username: "",
//         uid: "",
//         isModerator: false
//     } as AuthState,
// } as InitialState;

// export const auth = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         logOut: () => {
//             return initialState;
//         },
//         logIn: (state, action: PayloadAction<string>) => {
//             return {
//                 value: {
//                     isAuth: true,
//                     username: action.payload,
//                     uid: "",
//                     isModerator: false,
//                 },
//             };
//         },
//     },
// });

// export const { logIn, logOut } = auth.actions;
// export default auth.reducer;