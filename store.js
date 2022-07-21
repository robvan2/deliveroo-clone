import { configureStore } from '@reduxjs/toolkit'
import basketReducer from "./slices/basketSlice"

export default configureStore({
  reducer: {
    basket : basketReducer
  }
})