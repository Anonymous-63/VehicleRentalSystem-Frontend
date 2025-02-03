import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import formStatusSlice from "./features/formStatusSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        formStatus: formStatusSlice
    }
})