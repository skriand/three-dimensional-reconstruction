import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./images/images.slice";

export default configureStore({
  reducer: { images: imagesReducer },
});
