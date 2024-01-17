import { configureStore } from "@reduxjs/toolkit";
import filterBrandSlice from "./filterBrand-slice";
import logger from "redux-logger";
const store = configureStore({
  reducer: { filterBrands: filterBrandSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
}); // middleware provides the info about the actions and state in the console

export default store;
