import { createSlice } from "@reduxjs/toolkit";





const postSlice=createSlice({
    name:"post",
    initialState:{
        allPost:null,
        selectedPost :null,
       
    },
    reducers:{
        setallPost:(state,action)=>{
            state.allPost=action.payload
        },
        setSelectedPost:(state,action)=>{
            state.selectedPost=action.payload
        },


    }
})

export const {setallPost,setSelectedPost}=postSlice.actions
export default postSlice.reducer