import React, { useEffect, useState } from 'react';
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"
import RatingDistribution from '../../../Components/DashBoard/ReviewDashboard/RatingDistribution/RatingDistribution';
import StarRating from '../../../Components/DashBoard/StarRating/StarRating';
import DateFormat from "../../../Components/DashBoard/DateFormat/DateFormat"



const UserProfile = (props) => {
  const sessionId = localStorage.getItem("userId");
  // const userEmail = localStorage.getItem("useremail");

  const [data, setData] = useState([])
  let [reviews, setReviews] = useState([]);
  console.log("------------------",reviews)

  useEffect(() => {
    fetch("https://c-olly-default-rtdb.firebaseio.com/userprofile.json")
      .then((responseData) => responseData.json())
      .then((convertArray) => {
        const filteredData = Object.keys(convertArray).map((item) => ({
          // Assuming you have an 'id' property in each item
          id: item,
          ...convertArray[item],
        }));
  
        // Filter the data based on sessionId
     

          const filteredResponse = filteredData.filter(item => item.id === sessionId);
          setData(filteredResponse);
       
        // if(userEmail){
        //   const emailCompare =   filteredData.filter(item => item.Email === userEmail)
        //   setData(emailCompare);
        //   console.log(emailCompare["id"])
        //   localStorage.setItem("userId",emailCompare[0].id)
        // }
        
  
        // Set the filtered data to the state
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

        // setGlobatReview(dataArray);

        const filteredReviews = 
          dataArray.filter(
              (review) =>
                review.uid === sessionId 
            )
        

        setReviews(filteredReviews);
        // setFilterforReleaseChannel(filteredReviews);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchReviews();
  }, [sessionId]);

   
  return (
    <>
       <section className="leaving">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5">
              <div className="Verified-reviewer bg-white">
                <div className="leaving-profile">
                  <div className="Reviews-leaving d-flex align-items-center">
                    <img
                      src={commonimagepath("Ellipse 177.png")}
                      alt="Profile"
                    />
                    <div className="ml-4">
                      <h2 className="m-0 mb-2">Kopes R.</h2>
                      <p className="m-0 mb-1">Verified Reviewer</p>
                      <p className="m-0">Joined on Jan 3, 2022</p>
                    </div>
                  </div>
                  <div className="Leaving-rf py-2 my-4 justify-content-between px-4 d-flex align-items-center">
                    <p className="m-0">
                      <b className="mr-2 text-dark">{reviews.length}</b>Reviews
                    </p>
                    <p className="m-0">
                      <b className="mr-2 text-dark">114</b>Followers
                    </p>
                  </div>
                  <div className="edit-profile-leaving d-flex  justify-content-center align-items-center">
                    <img src={commonimagepath("Vector.svg")} alt="Profile" />

                    <h4 className="m-0 ml-2">Edit Profile</h4>
                  </div>
                </div>

                {data.map((item) => (

               
                <div className="About-leaving">
                  <h4>About</h4>
                  <p className="About-light-text">Location</p>
                  <p className="About-dark-text">California</p>
                  <p className="About-light-text">Email</p>
                  <p className="About-dark-text">{item.Email}</p>
                  <p className="About-light-text">Mobile</p>
                  <p className="About-dark-text">+1 291-***-4141</p>
                </div>
                  ))} 
                <div className="About-leaving">
                  <h4 className="mb-4">
                    <img
                      className="mr-1"
                      src={commonimagepath("Group 33728.svg")}
                      alt="Profile"
                    />
                    Recent Achievements{" "}
                  </h4>
                  <div className="Achievements d-flex align-items-center my-3 justify-content-between">
                    <div className=" d-flex align-items-center">
                      <img src={commonimagepath("Group 33688.png")} alt="" />
                      <p className="About-dark-text ml-2  m-0">Welcome</p>
                    </div>
                    <img src={commonimagepath("Vector.svg")} alt="" />
                  </div>
                  <div className="Achievements d-flex align-items-center mb-3 justify-content-between">
                    <div className=" d-flex align-items-center">
                      <img src={commonimagepath("Collaborator.png")} alt="" />
                      <p className="About-dark-text ml-2 m-0">Collaborator</p>
                    </div>
                    <img src={commonimagepath("Vector.svg")} alt="" />
                  </div>
                  <div className="Achievements d-flex align-items-center justify-content-between">
                    <div className=" d-flex align-items-center">
                      <img
                        src={commonimagepath("Critique Critic.png")}
                        alt=""
                      />
                      <p className="About-dark-text ml-2  m-0">
                        Critique Critic
                      </p>
                    </div>
                    <img src={commonimagepath("Vector.svg")} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-xl-7 col-lg-7 col-md-7">

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
                              // onClick={() => handleLike(index)}
                            >
                              <img
                                src={commonimagepath("Like copy.svg")}
                                alt="Like.svg"
                              />
                              {/* <h6 className="m-0">{likedCount}</h6> */}
                            </div>
                            <div
                              className="Reviews-box-main"
                              // onClick={() => handleShare(index)}
                            >
                              <img
                                src={commonimagepath("massage.svg")}
                                alt="massage.svg"
                              />
                              <h6 className="m-0">{review.shares || 0}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              // onClick={() => handleShare(index)}
                            >
                              <img
                                src={commonimagepath("share.svg")}
                                alt="share.svg"
                              />
                              <h6 className="m-0">{review.shares || 0}</h6>
                            </div>
                            <div
                              className="Reviews-box-main"
                              // onClick={() => handleFlag(index)}
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

            {/* <div className=" col-xl-7 col-lg-7 col-md-7">
              <div className="Achievements-main">
                <div className="d-flex align-items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                  >
                    <path
                      d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.58L3.83 7H18V5Z"
                      fill="black"
                    />
                  </svg>
                  <img
                    className="mx-3"
                    src={commonimagepath("Group 33728.svg")}
                    alt=""
                  />
                  <h4 className="m-0 mr-3">Achievements</h4>
                  <img src={commonimagepath("icon-png.png")} alt="" />
                </div>
                <div className="Achievements-card-box">
                  <div className="card Achievements-card">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5>Welcome</h5>
                    <p>Upload your brand logo and cover image.</p>
                  </div>
                  <div className="card Achievements-card">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5>Detail</h5>
                    <p>Update Release Hub consistently for six months.</p>
                  </div>
                  <div className="card Achievements-card">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5>Postmaster</h5>
                    <p>Setup your first topic in the Transparency Tab</p>
                  </div>
                  <div className="card Achievements-card">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5>Respondent</h5>
                    <p>Respond to the first three reviews about Releases.</p>
                  </div>
                </div>
               
                <div className="Achievements-card-box">
                  <div className="card Achievements-card dark-box">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5 className="text-white">Welcome</h5>
                    <p className="text-white">
                      Upload your brand logo and cover image.
                    </p>
                  </div>
                  <div className="card Achievements-card dark-box">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5 className="text-white">Welcome</h5>
                    <p className="text-white">
                      Upload your brand logo and cover image.
                    </p>
                  </div>
                  <div className="card Achievements-card dark-box">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5 className="text-white">Welcome</h5>
                    <p className="text-white">
                      Upload your brand logo and cover image.
                    </p>
                  </div>
                  <div className="card Achievements-card dark-box">
                    <h6>Transparency I</h6>
                    <img
                      className="my-4"
                      src={commonimagepath("Collaborator.png")}
                      alt=""
                    />
                    <h5 className="text-white">Welcome</h5>
                    <p className="text-white">
                      Upload your brand logo and cover image.
                    </p>
                  </div>
                </div>
              </div>
   
            </div> */}
            <div className='col-md-2'>
            <RatingDistribution/>
            </div>
            
          </div>
        </div>
      </section>
    
  </>
  )
}

export default UserProfile