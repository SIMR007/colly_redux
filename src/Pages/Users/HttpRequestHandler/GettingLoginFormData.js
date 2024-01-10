import React from "react";
import FormLogin from "../FormLogin/FormLogin";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GettingLoginFormData = () => {
  const navigate = useNavigate();

  const formLoginHandler = async (loginFormData) => {
    try {
      const response = await fetch(
        "https://c-olly-default-rtdb.firebaseio.com/userprofile.json"
      );
      const fetchedData = await response.json();

      if (fetchedData) {
        const dataArray = Object.keys(fetchedData).map((key) => ({
          id: key,
          ...fetchedData[key],
        }));

        // Check if the loginFormData.email matches any email in fetchedData
        const authenticatedUser = dataArray.find(
          (user) =>
            user.Email === loginFormData.email &&
            user.Password === loginFormData.password
        );

        if (authenticatedUser) {
          // User is authenticated; you can navigate to the UserLoggedIn page or perform other actions
          const { id, Email } = authenticatedUser;

          // Store user information in localStorage
          localStorage.setItem("userId", id);

          // await navigate('/Dashboard#reviews');
          await navigate("/BrandSearch");

          toast.success("User LoggedIn successfully ", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // User is not authenticated; you can show an error message or perform other actions

          toast.error("Wrong username or password !", {
            position: toast.POSITION.TOP_LEFT,
          });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <>
      <FormLogin onFormLogin={formLoginHandler} />
      <ToastContainer />
    </>
  );
};

export default GettingLoginFormData;
