import { createSlice } from "@reduxjs/toolkit";
import { JWT_REFRESH_TOKEN_PREFIX, JWT_TOKEN_PREFIX } from "../utils/Constants";


const storeUser = localStorage.getItem("user");
const initialState = storeUser ? JSON.parse(storeUser) : null;
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken: (state, action) => {
            if (action?.payload) {
                localStorage.setItem(JWT_TOKEN_PREFIX, action?.payload?.token);
                localStorage.setItem(JWT_REFRESH_TOKEN_PREFIX, action?.payload?.refreshToken);
            }
            return action?.payload;
        },
        removeToken: () => {
            localStorage.removeItem(JWT_TOKEN_PREFIX);
            localStorage.removeItem(JWT_REFRESH_TOKEN_PREFIX);
        },
        addUser: (state, action) => {
            if (action?.payload) {
                localStorage.setItem("user", JSON.stringify(action.payload));
                return action.payload;
            }
        },
        removeUser: () => {
            localStorage.removeItem("user");
            return null;
        }
    }
})

export const { addToken, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;