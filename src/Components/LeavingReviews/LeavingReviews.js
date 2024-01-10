import React from "react";
import commonimagepath from "../commonimagepath/commonimagepath";

const LeavingReviews = () => {
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
                      <b className="mr-2 text-dark">2</b>Reviews
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
                <div className="About-leaving">
                  <h4>About</h4>
                  <p className="About-light-text">Location</p>
                  <p className="About-dark-text">California</p>
                  <p className="About-light-text">Email</p>
                  <p className="About-dark-text">me***@gmail.com</p>
                  <p className="About-light-text">Mobile</p>
                  <p className="About-dark-text">+1 291-***-4141</p>
                </div>
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
            <div className=" col-xl-9 col-lg-8 col-md-7">
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
                {/* <!-- dark --> */}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeavingReviews;
