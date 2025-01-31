import { createSlice } from "@reduxjs/toolkit";
import { JWT_REFRESH_TOKEN_PREFIX, JWT_TOKEN_PREFIX } from "../utils/Constants";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addToken: (state, action) => {
            if (action?.payload) {
                localStorage.setItem(JWT_TOKEN_PREFIX, action?.payload?.token);
                localStorage.setItem(JWT_REFRESH_TOKEN_PREFIX, action?.payload?.refreshToken);
            }
            return action?.payload;
        },
        addUser: (state, action) => {
            if (action?.payload) {
                localStorage.setItem("user", action?.payload)
            }
            return action?.payload;
        },
        removeUser: (state, action) => {
            return null;
        }
    }
})

export const { addToken, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;