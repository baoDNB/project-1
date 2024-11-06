import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './silces/counterSlice'
import userReducer from './silces/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
})