import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: [],
  isLoading: false,
  searchTerm: "",
  selectedRatings: [],
  priceRange: [],
  selectedLocation: [],
  selectedCategories: [],
  filteredBrands: [], // This is where the filtered products should be stored
};

const filterBrandSlice = createSlice({
  name: "filterBrands",
  initialState: initialState,
  reducers: {

    showBrands(state,action) {      // will show the fetched brands from the firebase 
        state.data = action.payload.brandData       //defining brandData payload    //  we 
        state.filteredBrands =  state.data; // Set filteredBrands initially
        state.isLoading = action.payload.loading        // we can alo make a new method for loading  and set this line in that method 
    },

    onSearchInputChange(state, action) {
      state.searchTerm = action.payload;        // holds whatever the user type 
      console.log("state.searchTerm  =  ",state.searchTerm);
      // console.log("state.data",state.data);
    
      state.filteredBrands = state.data.filter((product) => {
        if (state.searchTerm.trim().length === 0) {
          return true;
        } else {
          return product.brand_name
            .toLowerCase()
            .includes(state.searchTerm.trim().toLowerCase());
        }
      });
    },
    
    onRatingChange(state, action) {
       // Correctly handle the action payload
      const rating = action.payload;

      console.log("rating", rating);
      console.log("state.selectedRating", state.selectedRatings);

      state.selectedRatings = state.selectedRatings.includes(rating)
        ? state.selectedRatings.filter((r) => r !== rating)
        :  state.selectedRatings=[rating];

      // Filter brands based on selected ratings
      state.filteredBrands = state.data.filter((product) => {
        if (state.selectedRatings.length === 0) {
          return true;
        }

        return state.selectedRatings.includes(product.rating);
      });
    },
    onPriceChange(state, action) {
      state.priceRange = action.payload
      console.log(state.priceRange)
    },
    onLocationChange(state, action) {},
    onCategoriesChange(state, action) {},
},
});


export const filterBrandActions = filterBrandSlice.actions;
export default filterBrandSlice ;

