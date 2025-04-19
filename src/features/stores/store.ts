import {configureStore} from  "@reduxjs/toolkit"
import { userAuthReducer } from "../slices/authSlice";


export const store = configureStore({
    reducer:{
        user:userAuthReducer,
    }
})
export default store;


export type RootState = ReturnType<typeof store.getState>