import { createSlice } from "@reduxjs/toolkit";

const otherSlice = createSlice({
  name:"otheruser",
  initialState:{
    otheruser : null 
  },
  reducers:{
    setotherUser:(state , action)=>{
      state.otheruser = action.payload
    }
  }
})

export const { setotherUser } = otherSlice.actions;
export default otherSlice.reducer;