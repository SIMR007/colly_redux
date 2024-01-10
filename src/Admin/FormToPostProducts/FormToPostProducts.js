import React, { useRef } from "react";
import { ref, push } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";


import { db, storage } from "../../../src/firebase";
const FormToPostProducts = () => {
  const Brand_name = useRef();
  const Rating = useRef();
  const Price = useRef();
  const Location = useRef();
  const RetailCategories = useRef();
  const Images = useRef();

  const About = useRef();
  const Address = useRef();
  const CompanySize = useRef();
  const BusinessType = useRef();
  const FoundedDate = useRef();
  const OperatingStatus = useRef();
  const CompanyType = useRef();

  const filterFormHandler = async (event) => {
    event.preventDefault();

    const enteredBrand_name = Brand_name.current.value;
    const enteredrating = Rating.current.value;
    const enteredprice = Price.current.value;
    const enteredLocation = Location.current.value;
    const enteredretailCategories = RetailCategories.current.value;
    const enteredImages = Images.current.files[0];

    const enteredAbout = About.current.value;
    const enteredAddress = Address.current.value;
    const enteredCompanySize = CompanySize.current.value;

    const enteredBusinessType = BusinessType.current.value;
    const enteredFoundedDate = FoundedDate.current.value;
    const enteredOperatingStatus = OperatingStatus.current.value;
    const enteredCompanyType = CompanyType.current.value;

    // Upload image to Firebase Storage
    const storageRefObj = storageRef(storage, `images/${enteredImages.name}`);
    await uploadBytes(storageRefObj, enteredImages);

    // Get the download URL for the uploaded image
    const imageURL = await getDownloadURL(storageRefObj);

    const filterformData = {
      brand_name: enteredBrand_name,
      rating: enteredrating,
      price: enteredprice,
      location: enteredLocation,
      retailcategories: enteredretailCategories,
      images: imageURL, // Save the image URL in filterformData

      about: enteredAbout,
      address: enteredAddress,
      companysize: enteredCompanySize,

      businesstype: enteredBusinessType,
      foundeddate: enteredFoundedDate,
      operatingstatus: enteredOperatingStatus,
      companyType: enteredCompanyType,
    };

    // Clear input fields
    Brand_name.current.value = "";
    Rating.current.value = "";
    Price.current.value = "";
    Location.current.value = "";
    RetailCategories.current.value = "";
    Images.current.value = null;

    About.current.value = "";
    Address.current.value = "";
    CompanySize.current.value = "";

    BusinessType.current.value = "";
    FoundedDate.current.value = "";
    OperatingStatus.current.value = "";
    CompanyType.current.value = "";

    try {
      // Save filterformData to Firebase Realtime Database
      const response = await push(ref(db, "brands"), filterformData);
      console.log("Data posted to Firebase:", response.key);
    } catch (error) {
      console.error("Error posting data to Firebase:", error.message);
    }
  };

  return (
    <section className="login_sec">
      <div className="container">
        <div className="login">
          <h1>filteredFormData</h1>
          <form onSubmit={filterFormHandler}>
            <div className="mb-3">
              <label htmlFor="brand_name" className="form-label">
                brand_name
              </label>
              <input
                className="form-control"
                id="brand_name"
                ref={Brand_name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input className="form-control" id="rating" ref={Rating} />
            </div>

            <div className="mb-3 form-check">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input className="form-control" id="Price" ref={Price} />
              {/* Here you can add Low, Mid, High options for the Price field */}
            </div>

            <div className="mb-3 form-check">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <input className="form-control" id="Location" ref={Location} />
            </div>

            <div className="mb-3 form-check">
              <label htmlFor="RetailCategories" className="form-label">
                RetailCategories
              </label>
              <input
                className="form-control"
                id="RetailCategories"
                ref={RetailCategories}
              />
            </div>

            <div className="mb-3 form-check">
              <label htmlFor="Images" className="form-label">
                Images
              </label>
              <input
                className="form-control"
                type="file"
                id="Images"
                ref={Images}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="About" className="form-label">
                About
              </label>
              <textarea className="form-control" id="About" ref={About} />
            </div>

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="Address"
                ref={Address}
              />
            </div>


           <div className="mb-3">
            <label htmlFor="CompanySize" className="form-label">
            CompanySize
              </label>
              <select id="CompanySize" className="form-control" ref={CompanySize}>
                <option value="" disabled selected>
                  e.g CompanySize
                </option>
                <option value="1-10">1-10</option>
                <option value="10-50">10-50</option>
                <option value="50-200">50-200</option>
                <option value="200-1000">200-1000</option>
                <option value="1000-10000">1000-10000</option>
              </select>
            </div>


            <div className="mb-3">
            <label htmlFor="BusinessType" className="form-label">
            BusinessType
              </label>
              <select id="BusinessType" className="form-control" ref={BusinessType}>
                <option value="" disabled selected>
                  e.g “BusinessType”
                </option>
                <option value="Private">Private</option>
                <option value="Public">Public</option>
              </select>
            </div>


            <div className="mb-3">
              <label htmlFor="FoundedDate" className="form-label">
              FoundedDate
              </label>
              <input
                type="text"
                className="form-control"
                id="FoundedDate"
                ref={FoundedDate}
              />
            </div>


            <div className="mb-3">
            <label htmlFor="OperatingStatus" className="form-label">
            OperatingStatus
              </label>
              <select id="OperatingStatus" className="form-control" ref={OperatingStatus}>
                <option value="" disabled selected>
                  e.g OperatingStatus
                </option>
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>

            <div className="mb-3">
            <label htmlFor="CompanyType" className="form-label">
            CompanyType
              </label>
              <select id="CompanyType" className="form-control" ref={CompanyType}>
                <option value="" disabled selected>
                  e.g CompanyType
                </option>
                <option value="For Profit">For Profit</option>
                <option value="For Non-profit">For Non-profit</option>
              </select>
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

export default FormToPostProducts;
