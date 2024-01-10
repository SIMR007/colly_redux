import commonimagepath from "../../../Components/commonimagepath/commonimagepath"
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormSignup = (props) => {



  const navigate = useNavigate();
  const [formShowStep1, setFormShowStep1] = useState(true);
  const [formShowStep2, setFormShowStep2] = useState(false);
  const [formShowStep4, setFormShowStep4] = useState(false);

  const FirstName = useRef();
  const LastName = useRef();
  const Password = useRef();
  const Email = useRef();
  const ProfileImageInput = useRef();
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');

  const formShowStep1Handler = (event) => {
    event.preventDefault();
    setEnteredFirstName(FirstName.current.value);
    setEnteredLastName(LastName.current.value);
    setEnteredPassword(Password.current.value);
    setEnteredEmail(Email.current.value);

    FirstName.current.value = "";
    LastName.current.value = "";
    Password.current.value = "";
    Email.current.value = "";

    setFormShowStep1(false);
    setFormShowStep2(true);
  };

  const formShowStep3Handler = async () => {
    try {
      // Save data to Firebase
      const formData = {
        FirstName: enteredFirstName,
        LastName: enteredLastName,
        Password: enteredPassword,
        Email: enteredEmail,
        ProfileImage: profileImagePreview || "", // Use profileImagePreview if available, otherwise set to null
      };
  
      // Wait for the signup data submission
      await props.onSubmitSignupData(formData);
  
      // Fetch user profile data
      const response = await fetch("https://c-olly-default-rtdb.firebaseio.com/userprofile.json");
      const convertArray = await response.json();
  
      console.log("convertArray", convertArray);
  
      // Convert the response into an array
      const dataArray = Object.keys(convertArray).map((item) => ({
        id: item, // Assuming each item has an 'id'
        ...convertArray[item],
      }));
  
      console.log("dataArray", dataArray);
  
      // Find the user in the array
      const foundUser = dataArray.find((user) => user.Email === formData.Email);
  
      if (foundUser) {
        console.log("User found:", foundUser.id);
        // Do something with foundUser or set it to state if needed
  
        // Save user ID to localStorage
        localStorage.setItem("userId", foundUser.id);
  
        // Update state to show the next step
        setFormShowStep2(false);
        setFormShowStep4(true);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error handling signup:", error);
    }
  };
  
  


  // Handle image selection
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      // Create a temporary URL for the selected image
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImagePreview(imageUrl);
    }
  };

  const showStep1Previousform1Handler = () => {
    setFormShowStep2(false);
    setFormShowStep1(true);
  };


  const navigateToUserProfile = () => {
    navigate('/UserProfile')
  }

  return (
    <section className="login_sec">
      <div className="container">
        {/**--- multistepForm----*/}
        {/**--- step1----*/}
        {formShowStep1 && (
          <div className="login">
            <h1>Sign Up</h1>
            <div className="new_user pb-0">
              <p className="text-left">Social Sign Up</p>
              <div className="reg_btn_group">
                <a href="#">
                  <div className="under_box">
                    <img
                      src={commonimagepath("google.png")}
                      alt={"googleLogo"}
                    />{" "}
                    Continue with Google
                  </div>{" "}
                  <span>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </span>
                </a>
              </div>
            </div>
            <form onSubmit={formShowStep1Handler}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="user"
                  className="form-control"
                  placeholder="e.g Smith"
                  required
                  ref={FirstName}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="pass"
                  className="form-control"
                  placeholder="e.g Smith"
                  required
                  ref={LastName}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="pass"
                  className="form-control"
                  placeholder="e.g jenny@gmail.com"
                  required
                  ref={Email}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="pass"
                  className="form-control"
                  placeholder="**********"
                  required
                  ref={Password}
                />
              </div>
              <div className="form-group">
                <input type="checkbox" required />
                <span className="ms-2">
                  Agree to Our <a style={{textDecoration:"underline"}} href="#">terms and Conditions</a>
                </span>
              </div>

              <input type="submit" name="submit" value="CONTINUE" />

              <p className="user_reg mb-0 mt-4">
                Already registered? <Link to="/FormLogin">Login</Link>
              </p>
            </form>
          </div>
        )}
        {/**--- step1----*/}

        {/**--- step2----*/}
        {formShowStep2 && (
          <div className="card m-auto" style={{ width: "26rem" }}>
            <div className="d-flex justify-content-between">
              <img
                src={commonimagepath("backbtn.svg")}
                className="rounded mx-auto d-block"
                alt="..."
                onClick={showStep1Previousform1Handler}
              />
              <div className="p-2 bd-highlight">Sign Up</div>
              <img
                src={commonimagepath("Frame 33328.svg")}
                className="rounded mx-auto d-block"
                alt="..."
              />
            </div>

            <div className="card-body text-center">
              <label htmlFor="profileImageInput">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    className="rounded mx-auto d-block mb-2"
                    alt="Preview"
                  />
                ) : (
                  <img
                    src={commonimagepath("Group 33727.svg")}
                    className="rounded mx-auto d-block mb-2"
                    alt="..."
                  />
                )}
                {!profileImagePreview ? <div className="upload-label">Upload a Profile</div> : <div className="upload-label">Upload New Profile</div>}
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                ref={ProfileImageInput}
              />

              {!profileImagePreview ? <a
                className="btn btn-secondary btn-lg btn-block mb-4 btn btn-dark rounded-pill"
                onClick={formShowStep3Handler}
              >
                CONTINUE WITHOUT PROFILE
              </a> : <a
                className="btn btn-secondary btn-lg btn-block mb-4 btn btn-dark rounded-pill"
                onClick={formShowStep3Handler}
              >
                CONTINUE
              </a>}

              <p className="user_reg mb-0 mt-4">
                Already registered? <Link to="/FormLogin">Login</Link>
              </p>
            </div>
          </div>
        )}
        {/**--- step2----*/}



        {/**--- step4----*/}
        {formShowStep4 && (
          <div className="card m-auto" style={{ width: "26rem" }}>
            <div className="card-header">Sign Up Successful</div>
            <div className="card-body">
              <h5 className="card-title mb-3">
                Congratulations Kopes, Fashion Explorer!
              </h5>
              <p className="card-text mb-5">
                Get ready to share your insights, discover the latest trends,
                and connect with fellow fashion enthusiasts.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-lg btn-block btn btn-dark rounded-pill"
                onClick={navigateToUserProfile}
              >
                GO TO MY ACCOUNT
              </button>
              {/* <button     // this button might be used in upcoming days 
                type="button"
                className="btn btn-outline-dark btn-lg btn-block rounded-pill"
              >
                PROCEED REVIEWING
              </button> */}
            </div>
          </div>
        )}
        {/**--- step4----*/}
      </div>
    </section>
  );
};

export default FormSignup;
