import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./slices/cryptoSlice";

export default configureStore({
    reducer: {
        cryptoReducer: cryptoSlice
    }
})