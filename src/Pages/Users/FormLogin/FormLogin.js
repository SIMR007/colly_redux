import React, { useRef } from "react";
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

import { Link } from "react-router-dom";

const FormLogin = (props) => {
  const userNameorEmail = useRef();
  const password = useRef();

  const loginHandler = (event) => {
    event.preventDefault();

    const enteredUserNameorEmail = userNameorEmail.current.value;
    const enteredPassword = password.current.value;

    const loginFormData = {
      email: enteredUserNameorEmail,
      password: enteredPassword,
    };

    userNameorEmail.current.value = "";
    password.current.value = "";

    props.onFormLogin(loginFormData);
  };

  return (
    <section className="login_sec">
      <div className="container">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={loginHandler}>
            <div className="form-group">
              <label>Username or email</label>
              <input
                type="text"
                name="user"
                className="form-control"
                placeholder="e.g jenny@gmail.com"
                ref={userNameorEmail}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="pass"
                className="form-control"
                placeholder="**********"
                ref={password}
                required
              />
            </div>
            <div className="form-group">
              <a href="#">Forgot Password?</a>
            </div>
            <input type="submit" name="submit" value="CONTINUE" />
          </form>
          <div className="new_user">
            <p className="user_reg">
              New User? <Link to="/FormSignup">Register</Link>
            </p>
            <div className="reg_btn_group">
              <a href="#">
                <div className="under_box">
                  <img src={commonimagepath("google.png")} alt={"googleLogo"} />{" "}
                  Continue with Google
                </div>{" "}
                <span>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormLogin;
