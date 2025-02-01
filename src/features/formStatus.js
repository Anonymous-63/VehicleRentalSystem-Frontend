import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "formStatus",
    initialState: false,
    reducers: {
        setFormStatus: (state, action) => {
            return !state;
        }
    }
})

export const { setFormStatus } = formSlice.actions;
export default formSlice.reducer;