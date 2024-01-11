import { configureStore } from "@reduxjs/toolkit";
import filterBrandSlice from "./filterBrand-slice";



const store =  configureStore({
    reducer:{filterBrands: filterBrandSlice.reducer}
})

export default store;