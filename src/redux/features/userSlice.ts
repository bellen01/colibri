import { createSlice } from "@reduxjs/toolkit";

// type InitialState = {
//     value: UserState;
// }

// type UserState = {

// }

export const UserSlice = createSlice({
    name: "UserSlice",
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clerUserData: (state, action) => {
            state.user = {}
        },
    },
});

export const { setUser, clerUserData } = UserSlice.actions;
export default UserSlice.reducer;