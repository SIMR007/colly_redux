import React, { useState, useEffect } from "react";
import userImg from "../../Assets/img/user.png";

import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";
import "../../App.css";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, onValue } from "firebase/database";

import map from "../../Assets/img/map.png";
import face from "../../Assets/img/face.png";
import dot from "../../Assets/img/dot.png";
import star from "../../Assets/img/star.png";


import ReviewDashboard from "./ReviewDashboard/ReviewDashboard";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import StarRating from "./StarRating/StarRating";

const DashBoard = () => {
  
    const initialRating = 0;
    const { brand_id: brandId } = useParams();
    
    const sessionId = localStorage.getItem("userId");
    console.log("sessionId",sessionId)
    const [brandCategory, setBrandCategory] = useState();

  const initialState = {
    release: "",
    date: "",
    shoppingType: "",
    location: "",
    experience: "",
    comment: "",
    images: [],
    brandid: brandId,
    uid: sessionId,
    categoryId: brandCategory,
  };
  
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [brandCategoryData, setBrandCategoryData] = useState([]);
  const [categoryName, setCategoryName] = useState();


  const [PassDataToReviewDashboard, setPassDataToReviewDashboard] = useState(
    []
  );
  const [reviewCount, setReviewCount] = useState(0);

  const [currentTab, setCurrentTab] = useState(0);

  const [formData, setFormData] = useState(initialState);
  const [rating, setRating] = useState(initialRating);

  const [follower, setFollower] = useState(false);
  const [followerCount, setfollowerCount] = useState(0);

  useEffect(() => {
    fetch("https://c-olly-default-rtdb.firebaseio.com/brands.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        const dataArray = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));
        const filteredData = dataArray.filter((item) => item.id === brandId);
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [follower,followerCount]);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://c-olly-default-rtdb.firebaseio.com/brandcategory.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        const dataArray = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));

        const filteredData = dataArray.filter(
          (item) => item.brandid === brandId
        );

        setBrandCategoryData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  useEffect(() => {
    fetch("https://c-olly-default-rtdb.firebaseio.com/reviews.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        const dataArray = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));

        const reviewData = dataArray.filter((item) => item.brandid === brandId);

        setReviewCount(reviewData);
        setPassDataToReviewDashboard(dataArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const showTab = (n) => {
    const x = document.getElementsByClassName("tab");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[n].style.display = "block";

    document.getElementById("prevBtn").style.display =
      n === 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML =
      n === x.length - 1 ? "Submit" : "Next";

    fixStepIndicator(n);
  };

  const nextPrev = (n) => {
    if (n === 1 && !validateForm()) return false;

    saveFormData();

    const x = document.getElementsByClassName("tab");
    x[currentTab].style.display = "none";
    setCurrentTab((prevTab) => prevTab + n);
  };

  const validateForm = () => {
    const x = document.getElementsByClassName("tab");
    const y = x[currentTab].getElementsByTagName("input");
    let valid = true;
    for (let i = 0; i < y.length; i++) {
      if (y[i].value === "") {
        y[i].className += " invalid";
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className +=
        " finish";
    }
    return valid;
  };

  const fixStepIndicator = (n) => {
    const x = document.getElementsByClassName("step");
    for (let i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
  };

  const saveFormData = async () => {
    const x = document.getElementsByClassName("tab");
    const y = x[currentTab].getElementsByTagName("input");

    const data = {
      ...formData,
      rating,
      categoryId: brandCategory,
    };

    for (let i = 0; i < y.length; i++) {
      const { name, value } = y[i];
      data[name] = value;
    }

    if (currentTab === 2) {
      const fileInput = document.querySelector('input[name="fileupload"]');
      const files = fileInput.files;

      const fileURLs = await Promise.all(
        Array.from(files).map(async (file) => {
          if (!file || !file.type.startsWith("image/")) {
            console.log("Skipping non-image file:", file);
            return null;
          }

          const childRef = ref(storage, `images/${file.name}`);

          try {
            const snapshot = await uploadBytes(childRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
          } catch (error) {
            console.error("Error uploading file:", error);
            return null;
          }
        })
      );

      data.images = fileURLs.filter((url) => url !== null);
    }

    const commentInput = document.querySelector('textarea[name="comment"]');
    data.comment = commentInput.value;

    const experienceInput = document.querySelector('input[name="experience"]');
    data.experience = experienceInput ? experienceInput.value : "";

    const locationInput = document.querySelector('input[name="location"]');
    data.location = locationInput ? locationInput.value : "";

    const shoppingTypeSelect = document.querySelector(
      'select[name="shoppingType"]'
    );
    data.shoppingType = shoppingTypeSelect ? shoppingTypeSelect.value : "";

    const releaseRadio = document.querySelector(
      'input[name="release"]:checked'
    );
    data.release = releaseRadio ? releaseRadio.value : "";

    setFormData(data);
  };

  const categoryHandler = (id,cname) => {
    setBrandCategory(id);
    setCategoryName(cname)
  };



  useEffect(() => { 
    if(sessionId){
      fetch("https://c-olly-default-rtdb.firebaseio.com/followers.json")
        .then((getfollowerData) => {
          if (!getfollowerData.ok) {
            throw new Error(`HTTP error! Status: ${getfollowerData.status}`);
          }
          return getfollowerData.json();
        })
        .then((followerresponse) => {
          const filterMappedArr = Object.keys(followerresponse).map((key) => ({
            id: key,
            ...followerresponse[key],
          }));
  
          const existingFollower = filterMappedArr.find(
            (follower) =>
              follower.brandid === brandId && follower.uid === sessionId
          );
  
          // Check if existingFollower is not undefined before accessing properties
          if (existingFollower) {
            setFollower(existingFollower.follower);
          } else {
            // If no follower found, setFollower to a default value or handle accordingly
            setFollower(false); // Assuming false as a default value
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    }
  }, [follower,followerCount]); // Include sessionId and brandId in the dependency array
  
  const followerHandler = async (event) => {
    event.preventDefault();
    let existingFollower =  []
    try {
      // Fetch current followers
      const getfollowerData = await fetch("https://c-olly-default-rtdb.firebaseio.com/followers.json");
  
      // if (!getfollowerData.ok) {
      //   getfollowerData = {}
      // }
  
      let followerresponse = await getfollowerData.json();
  
      if (!followerresponse) {
        followerresponse  = {}
        // throw new Error("Invalid response format");
      }
  
      const filterMappedArr = Object.keys(followerresponse).map((key) => ({
        id: key,
        ...followerresponse[key],
      }));
  if(followerresponse){
    existingFollower  = filterMappedArr.find(
      (follower) => follower.brandid === brandId && follower.uid === sessionId
    );
  }
      
  
      if (!existingFollower) {
        // Create a new follower
        const response = await fetch("https://c-olly-default-rtdb.firebaseio.com/followers.json", {
          method: "POST",
          body: JSON.stringify({
            follower: true,
            uid: sessionId,
            brandid: brandId,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
        setfollowerCount((pre) => pre + 1);
        setFollower(responseData.follower);
      } else {
        // Update existing follower
        const updatedStatus = !existingFollower.follower;
  
        const response = await fetch(`https://c-olly-default-rtdb.firebaseio.com/followers/${existingFollower.id}.json`, {
          method: "PATCH",
          body: JSON.stringify({ follower: updatedStatus }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const responseData = await response.json();
  
        if (!responseData.follower) {
          setfollowerCount((prevVl) => Math.max(0, prevVl - 1));
        } else {
          setfollowerCount((prevVl) => prevVl + 1);
        }
  
        setFollower(responseData.follower);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  

  useEffect(() => {
    fetch("https://c-olly-default-rtdb.firebaseio.com/followers.json")
      .then((getfollowerCountData) => {
        if (!getfollowerCountData.ok) {
          throw new Error(`HTTP error! Status: ${getfollowerCountData.status}`);
        }
        return getfollowerCountData.json();
      })
      .then((followerCountresponse) => {
        const followerCountarr = Object.keys(followerCountresponse).map(
          (key) => ({
            id: key,
            ...followerCountresponse[key],
          })
        );

        const trueFollowerCount = followerCountarr.filter(
          (follower) =>
            follower.brandid === brandId && follower.follower === true
        ).length;

        setfollowerCount(trueFollowerCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  async  function  submitForm () {
    try {
      const reviewsRef = await databaseRef(db, "reviews");
    await  push(reviewsRef, formData);
    } catch (error) {
      console.error("Error adding document:", error);
    }
    finally{
      window.location.reload()
    }
  };

  useEffect(() => {
    showTab(currentTab);
  }, [currentTab]);

  return (
    <>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Leave a review</h4>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="user_pr">
                <img src={userImg} alt={userImg} />
                <p>Ruby S.</p>
              </div>
              <form id="regForm" encType="multipart/form-data">
                <div className="tab">
                  <label>Select or Search a Recent Release</label>
                  <div className="recent recents">
                    {brandCategoryData.map((brand) => (
                      <>
                        <input
                          key={brand.id}
                          type="radio"
                          id={brand.id}
                          name="release"
                          value={brand.categories}
                          onChange={() => categoryHandler(brand.id,brand.categories)}
                        />

                        <label htmlFor={brand.id}>{brand.categories}</label>
                      </>
                    ))}
                  </div>
                </div>

                <div className="tab">
                  {data.map((brandName) => (

                 
                  <div className="exp Experience_Rate">
                    <p>
                      Rate your Experience on{" "}
                      <span>{brandName.brand_name}: {categoryName}</span>
                    </p>
                    <Rating
                      count={5}
                      value={rating}
                      onChange={setRating}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                   ))}
                  <div className="form_group form_group_select">
                    <label>Date of Experience</label>
                    <input type="date" name="date" className="form-control" />
                  </div>
                  <div className="form_group form_group_select">
                    <label>Shopping Experience Type</label>
                    <select className="form-control" name="shoppingType">
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </div>
                  <div className="form_group form_group_select">
                    <label>Which retail location did you shop at?</label>
                    <select className="form-control" name="location">
                      <option>Saks Fifth Avenue</option>
                      <option>Fifth</option>
                      <option>Avenue</option>
                      <option>Saks</option>
                    </select>
                  </div>
                </div>

                <div className="tab">
                  <div className="form__group">
                    <textarea className="form-control" rows="5" name="comment">
                      Help others out by sharing your experience.
                    </textarea>
                  </div>
                  <div className="add_review choose_files">
                    <p>Add to your review</p>
                    <input type="file" multiple name="fileupload"></input>
                    <img src={map} alt="Map" />
                    <img src={face} alt="Face" />
                    <img src={dot} alt="Dot" />
                  </div>
                </div>

                <div className="tab">
                  <h1 className="confirm_title Confirm_post-1">
                    Confirm & Post
                  </h1>
                  <div className="confirm">
                    <div className="con_head">
                      <p>
                        <span>{formData.date}</span>{" "}
                        <StarRating rating={rating} />{rating}
                      </p>
                    </div>
                    <h1>
                      {formData.release} <sub>{formData.shoppingType} Exp</sub>
                    </h1>
                    <div className="con_gallery">
                      {formData.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Gallery ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="post_setting post-Allow">
                    <h3>Post Setting</h3>
                    <div className="form_group Setting-Allow">
                      <div>
                        Allow Commenting{" "}
                        {/* <input
                          type="checkbox"
                          checked
                          data-toggle="toggle"
                          data-on="Ready"
                          data-off="Not Ready"
                          data-onstyle="success"
                          data-offstyle="danger"
                        /> */}
                          <label class="switch m-0">
                          <input type="checkbox"  />
                          <span class="slider_switch round"></span>
                        </label>
                      </div>
                      <div>
                        Allow Sharing{" "}
                        {/* <input
                          type="checkbox"
                          checked
                          data-toggle="toggle"
                          data-on="Ready"
                          data-off="Not Ready"
                          data-onstyle="success"
                          data-offstyle="danger"
                        /> */}
                          <label class="switch m-0">
                          <input type="checkbox"  />
                          <span class="slider_switch round"></span>
                        </label>
                      </div>
                      <div>
                        Show Rewards{" "}
                        {/* <input
                          type="checkbox"
                          checked
                          data-toggle="toggle"
                          data-on="Ready"
                          data-off="Not Ready"
                          data-onstyle="success"
                          data-offstyle="danger"
                        /> */}
                          <label class="switch m-0">
                          <input type="checkbox"  />
                          <span class="slider_switch round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ overflow: "auto" }}>
                  <div className="Prev_button" >
                    <button
                      type="button"
                      id="prevBtn"
                      onClick={() => nextPrev(-1)}
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      id="nextBtn"
                      onClick={() =>
                        currentTab ===
                        document.getElementsByClassName("tab").length - 1
                          ? submitForm()
                          : nextPrev(1)
                      }
                    >
                      {currentTab ===
                      document.getElementsByClassName("tab").length - 1
                        ? "Submit"
                        : "Next"}
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 40,
                  }}
                >
                  <span className="step" />
                  <span className="step" />
                  <span className="step" />
                  <span className="step" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <header>
        {loading ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="main-header">
              <div className="row">
                {data.map((item) => (
                  <>
                    <div className="col-md-2">
                      <div className="logo">
                        <a href="#">
                          <img src={item.images} alt={""} />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="top_review">
                        <h2>{item.brand_name}</h2>
                        <p>
                          <span>
                            {/* <img src={star} alt={star} /> */}
                            <StarRating rating={item.rating} />
                          </span>{" "}
                          {item.rating}
                        </p>
                        <div className="follow">
                          <p>
                            <b>{reviewCount.length}</b> <span>Reviews</span>{" "}
                            <b>{followerCount}</b> Followers
                          </p>
                          {sessionId ? <button className="follow-btn" onClick={followerHandler}>
                            {follower ? "Following" : "Follow"}
                          </button> : ''}
                          
                        </div>
                      </div>
                    </div>
                  </>
                ))}

                <div className="col-md-5 righ_box">
                  <div className="login_div">
                    {!sessionId ? (
                      <Link to="/FormLogin">Log In To Review</Link>
                    ) : (
                      <div className="review_now">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          Review Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <ReviewDashboard PassDataToReviewDashboard={PassDataToReviewDashboard} />
    </>
  );
};

export default DashBoard;
