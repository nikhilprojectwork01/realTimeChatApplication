import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name:"auth",
  initialState:{
    authUser : null ,
    selectedUser:null,
    searchName:"",
    onlineUsers:[null]
  },
  reducers:{
    setauthUser:(state , action)=>{
      state.authUser = action.payload
    },
    setselectedUser:(state , action)=>{
      state.selectedUser = action.payload
    },
    setsearchName:(state , action)=>{
      state.searchName = action.payload
    },
    setonlineUsers:(state , action)=>{
      state.onlineUsers = action.payload
    }
  }
})

export const { setauthUser , setselectedUser , setsearchName , setonlineUsers } = authSlice.actions;
export default authSlice.reducer;