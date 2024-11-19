import { configureStore } from '@reduxjs/toolkit'
import productReducer from './silces/productSlice'
import userReducer from './silces/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  }
})