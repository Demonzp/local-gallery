import { createSlice } from '@reduxjs/toolkit';
const initialState = { 
  images: [
    {
      src:'assets/2.jpg',
      id:1,
    },
    {
      src:'assets/cupcakes6.jpg',
      id:2,
    },
    {
      src:'assets/heart_cake_IL.jpg',
      id:3,
    }
  ] 
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage(state, {payload}){
      state.images.push(payload);
    }
  }
})

export const { addImage } = imagesSlice.actions;
export default imagesSlice.reducer;