// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: false,
//   data: [],
//   filteredBrands: [],           //  THIS IS OUR GLOBAL STATE ON WHICH ALL FILTER LOGICS ARE APPLIED // This is where the filtered brands should be stored
//   searchTerm: "",
//   selectedRatings: [],
//   priceRange: [],
//   selectedLocation: [],
//   selectedCategories: [],
//   changed:true              //  we use this extra state here to reduce the GET state every time when user change list or Grid view ,now Get request will only be sent on initial renderring
// };

// const filterBrandSlice = createSlice({
//   name: "filterBrands",
//   initialState: initialState,
//   //NOTE : IN THE REDUCER'S METHODS WE UPDATE THE( STATE) AND IN THE HELPER FUNCTIONN WE DEAL WITH THAT UPDATED STATE LIKE (RETURN) SOMETHING OR ELSE
//   reducers: {
//     showBrands(state, action) {
//       // will show the fetched brands from the firebase
//       state.data = action.payload.brandData; //defining brandData payload
//       state.filteredBrands = state.data; // Set filteredBrands initially      //  THIS IS OUR GLOBAL STATE ON WHICH ALL FILTER LOGICS ARE APPLIED
//       state.isLoading = action.payload.loading; // we can alo make a new method for loading  and set this line in that method
//       state.changed = false             // here we set it to false bcz now GET request has been sent and brands have been shown on the UI
//     },

//     onSearchInputChange(state, action) {
//       state.searchTerm = action.payload;
//       console.log("state.searchTerm = ", state.searchTerm);

//       // Filter based on search term
//       state.filteredBrands = filterBySearchTerm(state.data, state.searchTerm);    // This is if the user uses the search initially which will search from state.data(it holds all brands which we have fetche from the firebase)

//       // Filter based on selected ratings                    
//       state.filteredBrands = filterByRatings(       //WE USE THIS TO WORK RATING AND SEARCH SIMULTANEOUSLY SAME FOR OTHERS
//         state.filteredBrands,
//         state.selectedRatings
//       );

//       // Filter based on price range
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Filter based on location
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Filter based on category
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },

//     onRatingChange(state, action) {
//       // Correctly handle the action payload
//       const rating = action.payload;

//       state.selectedRatings.includes(rating)
//         ? (state.selectedRatings = state.selectedRatings.filter(
//             (r) => r !== rating
//           ))
//         : (state.selectedRatings = [rating]);

//       // Filter based on selected ratings              // Filter based on selected ratings
//       state.filteredBrands = filterByRatings(state.data, state.selectedRatings);

//       // Re-filter based on search term if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on price range  if it exists
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Re-filter based on location if it exists
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Re-filter based on category if it exists
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },
//     clearRating(state, action) {
//       state.selectedRatings = [];
//       // You may also want to update the filteredBrands array if necessary
//       state.filteredBrands = filterByRatings(state.data, state.selectedRatings);

//       // Re-filter based on search term if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on price range  if it exists
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Re-filter based on location if it exists
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Re-filter based on category if it exists
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },

//     onPriceChange(state, action) {
//       const minPrice = action.payload; // gives the price which we select means minPrice

//       if (state.priceRange.includes(minPrice)) {
//         state.priceRange = state.priceRange.filter(
//           (price) => price !== minPrice
//         );
//       } else {
//         state.priceRange = [minPrice];
//       }

//       // Filter based on price range if it exists
//       state.filteredBrands = filterByPrice(state.data, state.priceRange);

//       // Re-filter based on search term  if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on selected ratings if it exists
//       state.filteredBrands = filterByRatings(
//         state.filteredBrands,
//         state.selectedRatings
//       );

//       // Re-filter based on selected location if it exists
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Re-filter based on selected category if it exists
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },
//     clearPrice(state, action) {
//       state.priceRange = [];

//       // Filter based on price range if it exists
//       state.filteredBrands = filterByPrice(state.data, state.priceRange);

//       // Re-filter based on search term  if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on selected ratings if it exists
//       state.filteredBrands = filterByRatings(
//         state.filteredBrands,
//         state.selectedRatings
//       );

//       // Re-filter based on selected location if it exists
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Re-filter based on selected category if it exists
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },

//     onLocationChange(state, action) {
//       const location = action.payload;

//       if (state.selectedLocation.includes(location)) {
//         // setSelectedLocation(selectedRatings.filter((r) => r !== location));
//         state.selectedLocation = state.selectedLocation.filter(
//           (r) => r !== location
//         );
//       } else {
//         state.selectedLocation = [location];
//       }

//       // filter based on data which is in firebase means only for location if only location filter is applied if it exists
//       state.filteredBrands = filterByLocation(
//         state.data,
//         state.selectedLocation
//       );

//       // Filter based on price range if it exists
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Re-filter based on search term  if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on selected ratings if it exists
//       state.filteredBrands = filterByRatings(
//         state.filteredBrands,
//         state.selectedRatings
//       );

//       // Re-filter based on selected category if it exists
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },
//     clearLocation(state, action) {
//       state.selectedLocation = [];

//       // filter based on data which is in firebase means only for location if only location filter is applied if it exists
//       state.filteredBrands = filterByLocation(
//         state.data,
//         state.selectedLocation
//       );

//       // Filter based on price range if it exists
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Re-filter based on search term  if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on selected ratings if it exists
//       state.filteredBrands = filterByRatings(
//         state.filteredBrands,
//         state.selectedRatings
//       );

//       // Re-filter based on selected category if it exists
//       state.filteredBrands = filterByCategory(
//         state.filteredBrands,
//         state.selectedCategories
//       );
//     },

//     onCategoriesChange(state, action) {
//       const category = action.payload;

//       if (state.selectedCategories.includes(category)) {
//         state.selectedCategories = state.selectedCategories.filter(
//           (r) => r !== category
//         );
//       } else {
//         state.selectedCategories = [category];
//       }
//       // filter based on selected category if it exists
//       state.filteredBrands = filterByCategory(
//         state.data,
//         state.selectedCategories
//       );

//       // filter based on data which is in firebase means only for location if only location filter is applied if it exists
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Filter based on price range if it exists
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Re-filter based on search term  if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on selected ratings if it exists
//       state.filteredBrands = filterByRatings(
//         state.filteredBrands,
//         state.selectedRatings
//       );
//     },
//     clearCategories(state, action) {
//       state.selectedCategories = [];

//       // filter based on selected category if it exists
//       state.filteredBrands = filterByCategory(
//         state.data,
//         state.selectedCategories
//       );

//       // filter based on data which is in firebase means only for location if only location filter is applied if it exists
//       state.filteredBrands = filterByLocation(
//         state.filteredBrands,
//         state.selectedLocation
//       );

//       // Filter based on price range if it exists
//       state.filteredBrands = filterByPrice(
//         state.filteredBrands,
//         state.priceRange
//       );

//       // Re-filter based on search term  if it exists
//       state.filteredBrands = filterBySearchTerm(
//         state.filteredBrands,
//         state.searchTerm
//       );

//       // Re-filter based on selected ratings if it exists
//       state.filteredBrands = filterByRatings(
//         state.filteredBrands,
//         state.selectedRatings
//       );
//     },
//   },
// });

// // Helper function to filter brands based on search term
// const filterBySearchTerm = (brands, searchTerm) => {      //  here brands  refer to all brands which we are fetching from firebase and  searchTerm is name which user is searching in the searchBox
//   if (searchTerm.trim().length === 0) {
//     return brands;
//   }

//   return brands.filter((product) =>
//     product.brand_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
//   );
// };

// // Helper function to filter brands based on ratings
// const filterByRatings = (brands, selectedRatings) => {
//   if (selectedRatings.length === 0) {
//     return brands;
//   }

//   return brands.filter((product) => selectedRatings.includes(product.rating));
// };

// // Helper function to filter brands based on price range
// const filterByPrice = (brands, selectedPrice) => {
//   if (selectedPrice.length === 0) {
//     return brands;
//   }

//   let minPrice = selectedPrice[0];

//   return brands.filter((product) => {
//     let priceString = "";
//     const productPrice = product.price.toLowerCase();

//     if (minPrice == 1) {
//       priceString = "low";
//     } else if (minPrice == 2) {
//       priceString = "mid";
//     } else if (minPrice == 3) {
//       priceString = "high";
//     }

//     return priceString.includes(productPrice);
//   });
// };

// const filterByLocation = (brands, selectedLocation) => {
//   // filterProduct = filterProduct.filter((product) => {
//   if (selectedLocation.length === 0) {
//     return brands;
//   }

//   return brands.filter((product) =>
//     selectedLocation.includes(product.location)
//   );
//   // });
// };

// const filterByCategory = (brands, selectedCategory) => {
//   // filterProduct = filterProduct.filter((product) => {
//   if (selectedCategory.length === 0) {
//     return brands;
//   }

//   return brands.filter((product) =>
//     selectedCategory.includes(product.retailcategories)
//   );
//   // });
// };

// export const filterBrandActions = filterBrandSlice.actions;
// export default filterBrandSlice;























//========================================================THIS IS OPTIMISED CODE===============================================
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  filteredBrands: [],                    //  THIS IS OUR GLOBAL STATE ON WHICH ALL FILTER LOGICS ARE APPLIED // This is where the filtered brands should be stored
  searchTerm: "",
  selectedRatings: [],
  priceRange: [],
  selectedLocation: [],
  selectedCategories: [],
  changed: true,                  //  we use this extra state here to reduce the GET state every time when user change list or Grid view ,now Get request will only be sent on initial renderring
};

const filterBrandSlice = createSlice({
  name: "filterBrands",
  initialState: initialState,
   //NOTE : IN THE REDUCER'S METHODS WE UPDATE THE( STATE) AND IN THE HELPER FUNCTIONN WE DEAL WITH THAT UPDATED STATE LIKE (RETURN) SOMETHING OR ELSE
  reducers: {
    showBrands(state, action) {         // will show the fetched brands from the firebase
      state.data = action.payload.brandData;  //defining brandData payload
      state.filteredBrands = state.data;      // Set filteredBrands initially      //  THIS IS OUR GLOBAL STATE ON WHICH ALL FILTER LOGICS ARE APPLIED
      state.isLoading = action.payload.loading;   // we can alo make a new method for loading  and set this line in that method
      state.changed = false             // here we set it to false bcz now GET request has been sent and brands have been shown on the UI
     
    },

    onSearchInputChange(state, action) {
      state.searchTerm = action.payload;
      state.filteredBrands = applyFilters(state);
    },

    onRatingChange(state, action) {
      const rating = action.payload;
      state.selectedRatings = toggleFilter(state.selectedRatings, rating);
      state.filteredBrands = applyFilters(state);
    },

    clearRating(state, action) {
      state.selectedRatings = [];
      state.filteredBrands = applyFilters(state);
    },

    onPriceChange(state, action) {
      const minPrice = action.payload;      // gives the price which we select means minPrice
      state.priceRange = toggleFilter(state.priceRange, minPrice);
      state.filteredBrands = applyFilters(state);
    },

    clearPrice(state, action) {
      state.priceRange = [];
      state.filteredBrands = applyFilters(state);
    },

    onLocationChange(state, action) {
      const location = action.payload;
      state.selectedLocation = toggleFilter(state.selectedLocation, location);
      state.filteredBrands = applyFilters(state);
    },

    clearLocation(state, action) {
      state.selectedLocation = [];
      state.filteredBrands = applyFilters(state);
    },

    onCategoriesChange(state, action) {
      const category = action.payload;
      state.selectedCategories = toggleFilter(state.selectedCategories, category);
      state.filteredBrands = applyFilters(state);
    },

    clearCategories(state, action) {
      state.selectedCategories = [];
      state.filteredBrands = applyFilters(state);
    },
  },
});


// Helper functions to filter brands based on selected filter by user
const toggleFilter = (existingFilters, newFilter) => {      // here existingFilters refers to the (state.STATENAME) which we have in the inintialState object it cn be state.selectedRating,   state.priceRange,    state.selectedLocation  or many more
  return existingFilters.includes(newFilter)
    ? existingFilters.filter((filter) => filter !== newFilter)
    : [newFilter];
};

const applyFilters = (state) => {           // here state refers to the state arg which we have in our reducer functions 
  let filteredBrands = state.data;      // here we have made a global state 

  filteredBrands = filterBySearchTerm(filteredBrands, state.searchTerm);     // This is if the user uses the search initially which will search from state.data(it holds all brands which we have fetche from the firebase)                                                                            
  filteredBrands = filterByRatings(filteredBrands, state.selectedRatings);   // and it can also be search from the filterBrands of rating , price, location, category  bcz we are also passsing filterBrand to them as a firtst arg
  filteredBrands = filterByPrice(filteredBrands, state.priceRange);
  filteredBrands = filterByLocation(filteredBrands, state.selectedLocation);    //   we use global state (filterBrands) to work ale filters simultaneously
  filteredBrands = filterByCategory(filteredBrands, state.selectedCategories);

  return filteredBrands;
};

const filterBySearchTerm = (brands, searchTerm) => {        //  here brands  refer to all brands which we are fetching from firebase and  searchTerm is name which user is searching in the searchBox
  return searchTerm.trim().length === 0
    ? brands
    : brands.filter((product) =>
        product.brand_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
};

const filterByRatings = (brands, selectedRatings) => {
  return selectedRatings.length === 0
    ? brands
    : brands.filter((product) => selectedRatings.includes(product.rating));
};

// Helper function to filter brands based on price range
const filterByPrice = (brands, selectedPrice) => {
  if (selectedPrice.length === 0) {
    return brands;
  }

  const minPrice = selectedPrice[0];

  return brands.filter((product) => comparePrices(minPrice, product.price));
};

const comparePrices = (minPrice, productPrice) => {
  const priceMapping = {
    1: "low",
    2: "mid",
    3: "high",
  };

  return productPrice.toLowerCase().includes(priceMapping[minPrice]);
};


const filterByLocation = (brands, selectedLocation) => {
  return selectedLocation.length === 0
    ? brands
    : brands.filter((product) => selectedLocation.includes(product.location));
};

const filterByCategory = (brands, selectedCategory) => {
  return selectedCategory.length === 0
    ? brands
    : brands.filter((product) => selectedCategory.includes(product.retailcategories));
};

export const filterBrandActions = filterBrandSlice.actions;
export default filterBrandSlice;
