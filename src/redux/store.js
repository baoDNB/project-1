import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './silces/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})