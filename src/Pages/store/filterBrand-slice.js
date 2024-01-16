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
    //Note : in the reducer's methods we update the state and in the helper fn we deal with that updated state like return something or else 
  reducers: {
    showBrands(state, action) {    // will show the fetched brands from the firebase 
      state.data = action.payload.brandData;         //defining brandData payload 
      state.filteredBrands = state.data;            // Set filteredBrands initially
      state.isLoading = action.payload.loading;       // we can alo make a new method for loading  and set this line in that method 
    },
    
    onSearchInputChange(state, action) {
      state.searchTerm = action.payload;
      console.log("state.searchTerm = ", state.searchTerm);

      // Filter based on search term
      state.filteredBrands = filterBySearchTerm(state.data, state.searchTerm);

      // Filter based on selected ratings                     // we use this to work rating and search simultaneously
      state.filteredBrands = filterByRatings(state.filteredBrands, state.selectedRatings);

      // Filter based on price range        
      state.filteredBrands = filterByPrice(state.filteredBrands, state.priceRange);

      // Filter based on location         
      state.filteredBrands = filterByLocation(state.filteredBrands, state.selectedLocation);

      // Filter based on category         
      state.filteredBrands = filterByCategory(state.filteredBrands, state.selectedCategories);
    },

    onRatingChange(state, action) {
      // Correctly handle the action payload
      const rating = action.payload;

      console.log("rating", rating);

      state.selectedRatings.includes(rating)
        ? state.selectedRatings = state.selectedRatings.filter((r) => r !== rating)
        : state.selectedRatings = [rating];

      // Filter based on selected ratings              // Filter based on selected ratings
      state.filteredBrands = filterByRatings(state.data, state.selectedRatings);

      // Re-filter based on search term if it exists
      state.filteredBrands = filterBySearchTerm(state.filteredBrands, state.searchTerm);

      // Re-filter based on price range  if it exists
      state.filteredBrands = filterByPrice(state.filteredBrands, state.priceRange);

      // Re-filter based on location if it exists
      state.filteredBrands = filterByLocation(state.filteredBrands, state.selectedLocation);

      // Re-filter based on category if it exists
      state.filteredBrands = filterByCategory(state.filteredBrands, state.selectedCategories);
    },

    onPriceChange(state, action) {
      const minPrice = action.payload;         // gives the price which we select means minPrice

      console.log(minPrice); // gives the price which we select means minPrice

      if (state.priceRange.includes(minPrice)) {
        state.priceRange = state.priceRange.filter((price) => price !== minPrice);
      } else {
        state.priceRange = [minPrice];
      }

      // Filter based on price range if it exists
      state.filteredBrands = filterByPrice(state.data, state.priceRange);

      // Re-filter based on search term  if it exists
      state.filteredBrands = filterBySearchTerm(state.filteredBrands, state.searchTerm);

      // Re-filter based on selected ratings if it exists
      state.filteredBrands = filterByRatings(state.filteredBrands, state.selectedRatings);

      // Re-filter based on selected location if it exists
      state.filteredBrands = filterByLocation(state.filteredBrands, state.selectedLocation);

      // Re-filter based on selected category if it exists
      state.filteredBrands = filterByCategory(state.filteredBrands, state.selectedCategories);
    },

    onLocationChange(state, action) {
      const location =  action.payload
      console.log(location)
      if (state.selectedLocation.includes(location)) {
        // setSelectedLocation(selectedRatings.filter((r) => r !== location));  
        state.selectedLocation = state.selectedLocation.filter((r) => r !== location);
      } else {
        state.selectedLocation = [location];
      }

      // filter based on data which is in firebase means only for location if only location filter is applied if it exists
      state.filteredBrands = filterByLocation(state.data, state.selectedLocation);

       // Filter based on price range if it exists
       state.filteredBrands = filterByPrice(state.filteredBrands, state.priceRange);

       // Re-filter based on search term  if it exists
       state.filteredBrands = filterBySearchTerm(state.filteredBrands, state.searchTerm);
 
       // Re-filter based on selected ratings if it exists
       state.filteredBrands = filterByRatings(state.filteredBrands, state.selectedRatings);

       // Re-filter based on selected category if it exists
       state.filteredBrands = filterByCategory(state.filteredBrands, state.selectedCategories);
 

    },
    onCategoriesChange(state, action) {
      const category = action.payload;
      console.log(category)


      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter((r) => r !== category);
      } else {
        state.selectedCategories = [category];
      }
      // filter based on selected category if it exists
      state.filteredBrands = filterByCategory(state.data, state.selectedCategories);

      // filter based on data which is in firebase means only for location if only location filter is applied if it exists
      state.filteredBrands = filterByLocation(state.filteredBrands, state.selectedLocation);

       // Filter based on price range if it exists
       state.filteredBrands = filterByPrice(state.filteredBrands, state.priceRange);

       // Re-filter based on search term  if it exists
       state.filteredBrands = filterBySearchTerm(state.filteredBrands, state.searchTerm);
 
       // Re-filter based on selected ratings if it exists
       state.filteredBrands = filterByRatings(state.filteredBrands, state.selectedRatings);

    },


  },
});

// Helper function to filter brands based on search term
const filterBySearchTerm = (brands, searchTerm) => {
  if (searchTerm.trim().length === 0) {
    return brands;
  }

  return brands.filter((product) =>
    product.brand_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
};

// Helper function to filter brands based on ratings
const filterByRatings = (brands, selectedRatings) => {
  if (selectedRatings.length === 0) {
    return brands;
  }

  return brands.filter((product) => selectedRatings.includes(product.rating));
};


// Helper function to filter brands based on price range
const filterByPrice = (brands, selectedPrice) => {
  if (selectedPrice.length === 0) {
    return brands;
  }

  let minPrice = selectedPrice[0];

  return brands.filter((product) => {
    let priceString = "";
    const productPrice = product.price.toLowerCase();

    if (minPrice == 1) {
      priceString = "low";
    } else if (minPrice == 2) {
      priceString = "mid";
    } else if (minPrice == 3) {
      priceString = "high";
    }

    return priceString.includes(productPrice);
  });
};


const filterByLocation  =  (brands,selectedLocation) => {

  // filterProduct = filterProduct.filter((product) => {
    if (selectedLocation.length === 0) {
      return brands;
    }

    return brands.filter((product ) =>  selectedLocation.includes(product.location));
  // });
}


const filterByCategory  =  (brands,selectedCategory) => {

  // filterProduct = filterProduct.filter((product) => {
    if (selectedCategory.length === 0) {
      return brands;
    }

    return brands.filter((product ) =>  selectedCategory.includes(product.retailcategories));
  // });
}


export const filterBrandActions = filterBrandSlice.actions;
export default filterBrandSlice;
