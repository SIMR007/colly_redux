import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { ref, update } from "firebase/database";
import StarRating from "../StarRating/StarRating";
import ReleaseChannels from "./ReleaseChannels/ReleaseChannels";
import RatingDistribution from "./RatingDistribution/RatingDistribution";
import ReleaseHub from "./ReleaseHub/ReleaseHub";
import RecentActivity from "../RecentActivity/RecentActivity";
import SimilarRetailers from "../SimilarRetailers/SimilarRetailers";
import { useParams } from "react-router-dom";

import commonimagepath from "../../commonimagepath/commonimagepath";
import DateFormat from "../DateFormat/DateFormat";

const ReviewDashboard = (props) => {
  const sessionId = localStorage.getItem("userId");
  const { brand_id: brand_id } = useParams();

  const reviewsNodeIds = props.PassDataToReviewDashboard.map((item) => item.id);

  let [reviews, setReviews] = useState([]);
  const [filterforReleaseChannel, setFilterforReleaseChannel] = useState([]);

  const [loading, setLoading] = useState(true);
  const [likedReviews, setLikedReviews] = useState([]);
  const [likedCount, setlikedCount] = useState(0);
  
  const [globatReview, setGlobatReview] = useState();

  const [flaggedReviews, setFlaggedReviews] = useState([]);
  const [data, setData] = useState([]);
  const [filterCategory, setfilterCategory] = useState([]);
  
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
        const filteredData = dataArray.filter((item) => item.id === brand_id);
        
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
    }, []);
    console.log("///////////////////",data)



    useEffect(() => {
      // setIsLoading(true);
  
      fetch("https://c-olly-default-rtdb.firebaseio.com/retailcategory.json")
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
            (item) => item.brandid === brand_id
          );
          console.log("filterCategory",filteredData)
          setfilterCategory(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.message);
        });
    }, []);

   



  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://c-olly-default-rtdb.firebaseio.com/reviews.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        const dataArray = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));

        setGlobatReview(dataArray);

        const filteredReviews = sessionId
          ? dataArray.filter(
              (review) =>
                review.uid === sessionId && review.brandid === brand_id
            )
          : dataArray.filter((review) => review.brandid === brand_id);

        setReviews(filteredReviews);
        setFilterforReleaseChannel(filteredReviews);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchReviews();
  }, [sessionId]);

  // Function to handle like action
  const handleLike = async (index) => {
    if (index < 0 || index >= reviews.length) {
      console.error("Invalid index");
      return;
    }

    const review = reviews[index];

    if (!review || !review.date) {
      console.error("Invalid review or review date");
      return;
    }

    const reviewId = reviewsNodeIds[index];
    const currentLikes = review.like === true ? review.like : 0;
    const isLiked = likedReviews.includes(reviewId);

    const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

    try {
      // Check if the user has already liked the review
      const existingLike = await fetchLikeData(reviewId, sessionId);

      if (typeof existingLike === "undefined" && !existingLike) {
        // If the like doesn't exist, create a new one
        const response = await createLike(reviewId, sessionId);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Update state to reflect the change
        setLikedReviews((prevLikedReviews) => [...prevLikedReviews, reviewId]);
        setReviews((prevReviews) =>
          prevReviews.map((prevReview) =>
            prevReview.date === reviewId
              ? {
                  ...prevReview,
                  like: updatedLikes,
                }
              : prevReview
          )
        );
      } else {
        // If the like exists, toggle the like status
        const updatedStatus = !existingLike.like;
        const updateResponse = await updateLikeStatus(
          existingLike.id,
          updatedStatus
        );

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! Status: ${updateResponse.status}`);
        }

        // Update state to reflect the change
        setLikedReviews((prevLikedReviews) =>
          updatedStatus
            ? [...prevLikedReviews, reviewId]
            : prevLikedReviews.filter((likedId) => likedId !== reviewId)
        );
        setReviews((prevReviews) =>
          prevReviews.map((prevReview) =>
            prevReview.date === reviewId
              ? {
                  ...prevReview,
                  like: updatedLikes,
                }
              : prevReview
          )
        );
      }
    } catch (error) {
      console.error("Error handling like:", error.message);
    }
  };

  const fetchLikeData = async (reviewId, sessionId) => {
    try {
      const likeResponse = await fetch(
        `https://c-olly-default-rtdb.firebaseio.com/like.json`
      );

      if (!likeResponse.ok) {
        throw new Error(`HTTP error! Status: ${likeResponse.status}`);
      }

      const likeData = await likeResponse.json();

      if (!likeData || typeof likeData !== "object") {
        return undefined;
      }

      const likeArray = Object.keys(likeData).map((key) => ({
        id: key,
        ...likeData[key],
      }));

      const likedArr = likeArray.find(
        (like) => like.reviewId === reviewId && like.uid === sessionId
      );
      const likedArrCount = likeArray.find(
        (like) => like.reviewId === reviewId && like.brandid === brand_id
      ).length;

      setlikedCount(likedArrCount);

      return likedArr;
    } catch (error) {
      console.error("Error fetching like data:", error.message);
      return undefined;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const likeResponse = await fetch(
          `https://c-olly-default-rtdb.firebaseio.com/like.json`
        );

        if (!likeResponse.ok) {
          throw new Error(`HTTP error! Status: ${likeResponse.status}`);
        }

        const likeData = await likeResponse.json();

        if (!likeData || typeof likeData !== "object") {
          return undefined;
        }

        const likeArray = Object.keys(likeData).map((key) => ({
          id: key,
          ...likeData[key],
        }));

        const globalid = globatReview.map((review) => {
          return likeArray.some(
            (like) => like.reviewId === review.id && like.brandid === brand_id
          );
        });

        setlikedCount(likeArray);
      } catch (error) {
        console.error("Error fetching like data:", error.message);
        return undefined;
      }
    };
    fetchData();
  }, []);

  const createLike = async (reviewId, sessionId) => {
    return fetch(`https://c-olly-default-rtdb.firebaseio.com/like.json`, {
      method: "POST",
      body: JSON.stringify({
        like: true,
        uid: sessionId,
        reviewId: reviewId,
        brandid: brand_id,
      }),
    });
  };

  const updateLikeStatus = async (likeId, updatedStatus) => {
    return fetch(
      `https://c-olly-default-rtdb.firebaseio.com/like/${likeId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ like: updatedStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  // Function to handle share action
  const handleShare = (index) => {
    // Your logic to handle share
    // Similar logic as handleLike, implement as needed
  };

  // Function to handle flag action
  const handleFlag = (index) => {
    // Your logic to handle flag
    const reviewId = reviews[index].date;

    if (!flaggedReviews.includes(reviewId)) {
      // Flag the review
      const updatedFlaggedReviews = [...flaggedReviews, reviewId];
      setFlaggedReviews(updatedFlaggedReviews);

      // Update the review's flags count in the database
      update(ref(db, `reviews/${reviewId}`), {
        flags: (reviews[index].flags || 0) + 1,
      });
    }
  };

  const reviewFilter = (id) => {
    let abc = filterforReleaseChannel.filter(
      (review) => review.categoryId === id && review.brandid === brand_id
    );

    setReviews(abc);
  };
  console.log(reviews);

  return (
    <section className="dashboard-content">
      <div className="dash_tab">
        <ul className="nav nav-tabs">
          <li>
            <a data-toggle="tab" href="#summary">
              Summary
            </a>
          </li>
          <li>
            <a data-toggle="tab" className="active" href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#recent-activity">
              Recent Activity
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#release-hub">
              Release Hub
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#similar-retailers">
              Similar Retailers
            </a>
          </li>
        </ul>
        
        <div className="tab-content">
          <div id="summary" className="tab-pane fade in">
            
            <div className="container">
        <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5">
              {data.map((summaryBrand) => (

             
                <div className="Summary">
                    <h3 className="mb-2">About</h3>
                    <p className="mb-2 summaryBrand_about">{summaryBrand.about}</p>
                    <div className="list-l">
                        <div className="d-flex gap-2  align-items-center mb-2">
                           
                            <img src={commonimagepath("location.svg")} alt="" />
                            <p className="ml-2 m-0">{summaryBrand.address}</p>
                        </div>
                        <div className="d-flex gap-2  align-items-center mb-2">
                           
                            <img src={commonimagepath("user.svg")} alt="" />
                            <p className="ml-2 m-0">1001-5000</p>       
                        </div>
                        <div className="d-flex gap-2  align-items-center my-2">
                           
                            <img src={commonimagepath("Group.svg")} alt="" />
                            <p className="ml-2 m-0">{summaryBrand.businesstype}</p>
                        </div>
                    </div>
                    <h3 className="my-3">Details</h3>

                    <p className="Summary_light">Industries</p>
                    <div className="Summary_Industries">
                    {filterCategory.map((retailCategory) => (

                   
                    
                        <h6>{retailCategory.retaicategories}</h6>
                       
                   
             ))}
              </div>
                    <p className="Summary_light">Founded Date</p>
                    <p className="Summary_dark">{summaryBrand.foundeddate}</p>


                    <p className="Summary_light">Operating Status</p>
                    <p className="Summary_dark">{summaryBrand.operatingstatus}</p>

                    <p className="Summary_light">Company Type</p>
                    <p className="Summary_dark">{summaryBrand.companyType}</p>
                    <div className="Summary_icons mt-4">
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </div>
             ))}
            </div>

            <div className="col-md-6">
                  <div className="review_content">
            {reviews && reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div className="review_box_top mt-2" key={index}>
                          <div key={index} className="review_body">
                            <div className="date">
                              <span>{<DateFormat date={review.date} />}</span>
                              <p>
                                <StarRating rating={review.rating} />
                                <span>{review.rating}</span>
                              </p>
                            </div>
                            <div className="user-name">
                              <h1>
                                {review.release}{" "}
                                <sub>{review.shoppingType} Experience</sub>
                              </h1>
                              <p>{review.comment}</p>

                              <div className="media">
                                {Array.isArray(review.images) &&
                                  review.images.map((img, imgIndex) => (
                                    <img
                                      key={imgIndex}
                                      src={img}
                                      alt={`Review Image ${imgIndex + 1}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>

                       
                          <div className="Reviews-boxs-l mt-2">
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleLike(index)}
                            >
                              <img
                                src={commonimagepath("Like copy.svg")}
                                alt="Like.svg"
                              />
                              <h6 className="m-0">{likedCount}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleShare(index)}
                            >
                              <img
                                src={commonimagepath("massage.svg")}
                                alt="massage.svg"
                              />
                              <h6 className="m-0">{review.shares || 0}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleShare(index)}
                            >
                              <img
                                src={commonimagepath("share.svg")}
                                alt="share.svg"
                              />
                              <h6 className="m-0">{review.shares || 0}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleFlag(index)}
                            >
                              <img
                                src={commonimagepath("flag.svg")}
                                alt="flag.svg"
                              />
                              <h6 className="m-0">{review.flags || 0}</h6>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )}
        </div>
        </div>

















            <div className="col-xl-2 col-md-3">
                <div className="summary_Achievements">
                    <div className="d-flex gap-2 mb-4 align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="10" fill="#2D2D2D" />
                            <path
                                d="M22 8H10V10.499L14.3575 13.7669C11.605 14.6738 10.105 17.6418 11.0125 20.3925C11.92 23.1432 14.875 24.6422 17.6425 23.7353C20.395 22.8284 21.895 19.8678 20.9875 17.1097C20.4625 15.5282 19.225 14.284 17.6425 13.7669L22 10.499V8ZM18.205 22.1164L16 20.8272L13.795 22.1164L14.38 19.6205L12.4375 17.9416L14.995 17.7243L16 15.3708L17.005 17.7243L19.5625 17.9416L17.62 19.6205L18.205 22.1164Z"
                                fill="#FEFFFF" />
                        </svg>
                        <h4 className="m-0 ml-2">Achievements </h4>
                    </div>
                    <div className="d-flex mb-3 gap-2 align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="10" fill="#2D2D2D" />
                            <path
                                d="M22 8H10V10.499L14.3575 13.7669C11.605 14.6738 10.105 17.6418 11.0125 20.3925C11.92 23.1432 14.875 24.6422 17.6425 23.7353C20.395 22.8284 21.895 19.8678 20.9875 17.1097C20.4625 15.5282 19.225 14.284 17.6425 13.7669L22 10.499V8ZM18.205 22.1164L16 20.8272L13.795 22.1164L14.38 19.6205L12.4375 17.9416L14.995 17.7243L16 15.3708L17.005 17.7243L19.5625 17.9416L17.62 19.6205L18.205 22.1164Z"
                                fill="#FEFFFF" />
                        </svg>
                        <h5 className="m-0 ml-2">Welcome </h5>
                    </div>
                    <div className="d-flex mb-3 gap-2 align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="10" fill="#2D2D2D" />
                            <path
                                d="M22 8H10V10.499L14.3575 13.7669C11.605 14.6738 10.105 17.6418 11.0125 20.3925C11.92 23.1432 14.875 24.6422 17.6425 23.7353C20.395 22.8284 21.895 19.8678 20.9875 17.1097C20.4625 15.5282 19.225 14.284 17.6425 13.7669L22 10.499V8ZM18.205 22.1164L16 20.8272L13.795 22.1164L14.38 19.6205L12.4375 17.9416L14.995 17.7243L16 15.3708L17.005 17.7243L19.5625 17.9416L17.62 19.6205L18.205 22.1164Z"
                                fill="#FEFFFF" />
                        </svg>
                        <h5 className="m-0 ml-2">Collaborator </h5>
                    </div>
                    <div className="d-flex mb-3 gap-2 align-items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="10" fill="#2D2D2D" />
                            <path
                                d="M22 8H10V10.499L14.3575 13.7669C11.605 14.6738 10.105 17.6418 11.0125 20.3925C11.92 23.1432 14.875 24.6422 17.6425 23.7353C20.395 22.8284 21.895 19.8678 20.9875 17.1097C20.4625 15.5282 19.225 14.284 17.6425 13.7669L22 10.499V8ZM18.205 22.1164L16 20.8272L13.795 22.1164L14.38 19.6205L12.4375 17.9416L14.995 17.7243L16 15.3708L17.005 17.7243L19.5625 17.9416L17.62 19.6205L18.205 22.1164Z"
                                fill="#FEFFFF" />
                        </svg>
                        <h5 className="m-0 ml-2">Critique Critic </h5>
                    </div>
                    <div className="View_All">
                        <h3>View All</h3>
                    </div>
                   
                </div>
                <div className="Customer_Support mt-2">
                    <h2 className="mb-2">Customer Support</h2>
                    <p className="mb-3">All Reviews <span>Average reply time: 2 hours</span> 2 hours </p>
                    <button>Contact</button>
                </div>
            </div>
        </div>
    </div>




          </div>
          <div id="reviews" className="tab-pane fade show active">
            <div className="container">
              <div className="row">
                <ReleaseChannels releaseChannelSideBarIds={reviewFilter} />

                <div className="col-md-6">
                  <div className="review_content">
                    <div className="review_box_top">
                      <div className="row">
                        <div className="col-md-6">
                          <h1 className="rev_tit">
                            Reviews{" "}
                            {reviews.length > 0 && (
                              <span>({reviews.length})</span>
                            )}
                          </h1>
                        </div>
                        <div className="col-md-6">
                          <div className="sort_filter">
                            <h2>Sort</h2>
                            <select className="form-control">
                              <option>Most Recent</option>
                              <option>Recent</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Render reviews */}

                    
                    {reviews && reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <div className="review_box_top mt-2" key={index}>
                          <div key={index} className="review_body">
                            <div className="date">
                            <span>{<DateFormat date={review.date} />}</span>
                              <p>
                                <StarRating rating={review.rating} />
                                <span>{review.rating}</span>
                              </p>
                            </div>
                            <div className="user-name">
                              <h1>
                                {review.release}{" "}
                                <sub>{review.shoppingType} Experience</sub>
                              </h1>
                              <p>{review.comment}</p>

                              <div className="media">
                                {Array.isArray(review.images) &&
                                  review.images.map((img, imgIndex) => (
                                    <img
                                      key={imgIndex}
                                      src={img}
                                      alt={`Review Image ${imgIndex + 1}`}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>

                          {/* Review action buttons */}
                          <div className="Reviews-boxs-l mt-2">
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleLike(index)}
                            >
                              <img
                                src={commonimagepath("Like copy.svg")}
                                alt="Like.svg"
                              />
                              <h6 className="m-0">{likedCount}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleShare(index)}
                            >
                              <img
                                src={commonimagepath("massage.svg")}
                                alt="massage.svg"
                              />
                              <h6 className="m-0">{review.shares || 0}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleShare(index)}
                            >
                              <img
                                src={commonimagepath("share.svg")}
                                alt="share.svg"
                              />
                              <h6 className="m-0">{review.shares || 0}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              onClick={() => handleFlag(index)}
                            >
                              <img
                                src={commonimagepath("flag.svg")}
                                alt="flag.svg"
                              />
                              <h6 className="m-0">{review.flags || 0}</h6>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )}
                  </div>
                </div>

                {/* Render other components */}
               
                <div className="col-md-3">
                <RatingDistribution  revewsData={reviews}/>
                </div>
              </div>
            </div>
          </div>

          {/* Render other tabs */}
          <div id="recent-activity" className="tab-pane fade">
            <RecentActivity />
          </div>
          <div id="release-hub" className="tab-pane fade">
            <ReleaseHub />
          </div>
          <div id="similar-retailers" className="tab-pane fade">
            <SimilarRetailers />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDashboard;
