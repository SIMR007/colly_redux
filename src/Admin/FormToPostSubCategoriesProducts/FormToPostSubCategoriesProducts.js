import React, { useEffect, useRef, useState } from "react";

const FormToPostSubCategoriesProducts = () => {
  const [brandCategory, setBrandCategory] = useState([]);
  const Brand_name = useRef();
  const Categories = useRef();

  useEffect(() => {
    const getFilterFormData = async () => {
      try {
        const response = await fetch(
          "https://c-olly-default-rtdb.firebaseio.com/brands.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postedFilteredData = await response.json();

        const categoriesarray = Object.keys(postedFilteredData).map(
          (category) => ({
            id: category,
            ...postedFilteredData[category],
          })
        );

        setBrandCategory(categoriesarray);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFilterFormData();
  }, []);

  const filterFormHandler = async (event) => {
    event.preventDefault();

    const enteredBrand_id = Brand_name.current.value;

    const enteredCategories = Categories.current.value;

    const filterformData = {
      brandid: enteredBrand_id,
      categories: enteredCategories,
    };

    Brand_name.current.value = "";
    Categories.current.value = "";

    try {
      // Fetch the existing data from Firebase
      const response = await fetch(
        "https://c-olly-default-rtdb.firebaseio.com/brands.json"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const existingData = await response.json();

      // Find the specific node for the selected brand
      const brandId = Object.keys(existingData).find(
        (id) => id === enteredBrand_id
      );

      if (brandId) {
        const updateResponse = await fetch(
          `https://c-olly-default-rtdb.firebaseio.com/brandcategory.json`,
          {
            method: "POST",
            body: JSON.stringify(filterformData),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! Status: ${updateResponse.status}`);
        }
      } else {
        console.log("Brand not found in the database.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Rest of your component code remains the same

  return (
    <section className="login_sec">
      <div className="container">
        <div className="login">
          <h1>filteredFormData</h1>
          <form onSubmit={filterFormHandler}>
            <div className="mb-3 form-check">
              <label className="form-label">BrandName</label>
              <select className="form-control"  ref={Brand_name}>
                {brandCategory.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.brand_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 form-check">
              <label htmlFor="Category" className="form-label">
                Category
              </label>
              <input className="form-control" id="Category" ref={Categories} />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormToPostSubCategoriesProducts;
