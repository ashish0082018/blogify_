import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        authUserDetails:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload
        },
        setauthUserDetail:(state,action)=>{
            state.authUserDetails=action.payload
        }

    }
});

export const {setAuthUser,setauthUserDetail}=userSlice.actions;
export default userSlice.reducer;

