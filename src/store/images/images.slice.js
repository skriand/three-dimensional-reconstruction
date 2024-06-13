import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
  },
  reducers: {
    setImage: (state, action) => {
      state.images = [...state.images, action.payload];
    },
  },
});

export default imagesSlice.reducer;
