import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import PostingSignUPformData from "./Pages/Users/HttpRequestHandler/PostingSignUPformData";
import GettingLoginFormData from "./Pages/Users/HttpRequestHandler/GettingLoginFormData";
import DashBoard from "./Components/DashBoard/DashBoard";

import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormToPostProducts from "./Admin/FormToPostProducts/FormToPostProducts";
import Brands from "./Components/Brands/Brands";
import LeavingReviews from "./Components/LeavingReviews/LeavingReviews";
import FormToPostSubCategoriesProducts from "./Admin/FormToPostSubCategoriesProducts/FormToPostSubCategoriesProducts";
import Navbar from "./Pages/Navbar/Navbar";
import FormToPostRetailCategory from "./Admin/FormToPostRetailCategory/FormToPostRetailCategory";

// import UserLoggedIn from "./Pages/Users/UserProfile/UserProfile";
import UserProfile from "./Pages/Users/UserProfile/UserProfile";


function App() {



  return (
    <>
      <>
        <Router>
          <Navbar
            Search={
              <Link className="nav-link" to="/Search">
                Search
              </Link>
            }
            Categories={
              <Link className="nav-link" to="/BrandSearch">
                Categories
              </Link>
            }
            News={
              <Link className="nav-link" to="/News">
                NEWS
              </Link>
            }
          />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard/:brand_id" element={<DashBoard />} />
            <Route path="/FormSignup" element={<PostingSignUPformData />} />
            <Route path="/FormLogin" element={<GettingLoginFormData />} />

            <Route
              path="/UserProfile"
             
              element={<UserProfile />}
            />
           

            <Route
              path="/FormToPostProducts"
              element={<FormToPostProducts />}
            />
            <Route
              path="/FormToPostSubCategoriesProducts"
              element={<FormToPostSubCategoriesProducts />}
            />
            <Route
              path="/FormToPostRetailCategory"
              element={<FormToPostRetailCategory />}
            />
            <Route path="/BrandSearch" element={<Brands />} />
            <Route path="/LeavingReviews" element={<LeavingReviews />} />
          </Routes>
        </Router>
      </>
    </>
  );
}

export default App;
