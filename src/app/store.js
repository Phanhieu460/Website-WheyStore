import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/authSlice";
import customerSlice from "../features/Customer/customerSlice";
import productSlice from "../features/Product/productSlice"
import blogSlice from "../features/Blog/blogSlice"

export default configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        customer: customerSlice,
        blog: blogSlice
    }
})