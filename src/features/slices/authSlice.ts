import { createSlice } from "@reduxjs/toolkit";


const createAuthSlice = (sliceName:string)=>{
    const initialState = {
        [sliceName] : localStorage.getItem(sliceName) ? JSON.parse(localStorage.getItem(sliceName as string) as string) : null
    }
    return createSlice({
        name:sliceName, 
        initialState:initialState,
        reducers :{
            setCredentials:(state , action)=>{
                state[sliceName] = action.payload;
                localStorage.setItem(sliceName , JSON.stringify(action.payload))
            },
            logout :(state)=>{
                state[sliceName] = null;
                localStorage.removeItem(sliceName)
            }
        },
       

    })
}
 const userAuthSlice = createAuthSlice("userInfo")
 export const{setCredentials:setUserCredentials, logout:userLogout} =userAuthSlice.actions
  export const userAuthReducer = userAuthSlice.reducer



