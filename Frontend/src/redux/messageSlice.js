import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name:"messages",
  initialState:{
    messages : null 
  },
  reducers:{
    setmessage:(state , action)=>{
      state.messages = action.payload
    }
  }
})

export const { setmessage } = messageSlice.actions;
export default messageSlice.reducer;