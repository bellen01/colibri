import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    status: null
}

// export const productsFetch = createAsyncThunk(
//     ""
// )

export const productSlice = createSlice({
    name: "cart",
    initialState: {},
    reducers: {}
})

export default productSlice.reducer