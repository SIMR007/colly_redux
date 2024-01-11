import React, { useState, useEffect } from "react";

const SidebarFilterContext = React.createContext({
  onSearchInputChange: () => {},
  filteredProductsByRating: [],

  onRatingChange: () => {},
  onPriceChange: () => {},
  onLocationChange: () => {},
  onCategoriesChange: () => {},
  clearRating: () => {},
  clearPrice: () => {},
  clearLocation: () => {},
  clearCategories: () => {},
  isLoading: false,
});

export const SidebarFilterContextProvider = (props) => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(
          "https://c-olly-default-rtdb.firebaseio.com/brands.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const dataArray = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));

        setData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handlePriceChange = (minPrice) => {
    if (priceRange.includes(minPrice)) {
      setPriceRange(priceRange.filter((product) => product !== minPrice));
    } else {
      setPriceRange([minPrice]);
    }
  };

  const clearPriceChange = () => {
    setPriceRange([]);
  };

  const handleLocationChange = (location) => {
    if (selectedLocation.includes(location)) {
      // setSelectedLocation(selectedRatings.filter((r) => r !== location));  
      setSelectedLocation(selectedLocation.filter((r) => r !== location));
    } else {
      setSelectedLocation([location]);
    }
    // Add a console log to check the selected ratings
  };

  const clearLocation = () => {
    setSelectedLocation([]);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((r) => r !== category));
    } else {
      setSelectedCategories([category]);
    }
    // Add a console log to check the selected ratings
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const handleRatingChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([rating]);
    }
    // Add a console log to check the selected ratings
  };

  const clearRatingChange = () => {
    setSelectedRatings([]);
  };

  let filterProduct = data;

  filterProduct = data.filter((product) => {
    if (searchTerm.trim().length === 0) {
      return true;
    } else {
      return product.brand_name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
    }
  });

  filterProduct = filterProduct.filter((product) => {
    if (selectedRatings.length === 0) {
      return true;
    }

    return selectedRatings.includes(product.rating);
  });

  filterProduct = filterProduct.filter((product) => {
    if (priceRange.length === 0) {
      return true;
    }

    let minPrice = priceRange[0];

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

  filterProduct = filterProduct.filter((product) => {
    if (selectedLocation.length === 0) {
      return true;
    }

    return selectedLocation.includes(product.location);
  });

  filterProduct = filterProduct.filter((product) => {
    if (selectedCategories.length === 0) {
      return true;
    }

    return selectedCategories.includes(product.retailcategories);
  });

  return (
    <SidebarFilterContext.Provider
      value={{
       
        isLoading: isLoading,
        onSearchInputChange: setSearchTerm,
        filteredProductsByRating: filterProduct,
        
        onRatingChange: handleRatingChange,
        onPriceChange: handlePriceChange,
        onLocationChange: handleLocationChange,
        onCategoriesChange: handleCategoryChange,

        clearRating: clearRatingChange,
        clearPrice: clearPriceChange,
        clearLocation: clearLocation,
        clearCategories: clearCategories,
      }}
    >
      {props.children}
    </SidebarFilterContext.Provider>
  );
};

export default SidebarFilterContext;
