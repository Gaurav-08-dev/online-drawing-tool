import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/slice/menuSlice"

export const GlobalStore = configureStore({
    reducer: {
        menu: MenuReducer
    }
})
