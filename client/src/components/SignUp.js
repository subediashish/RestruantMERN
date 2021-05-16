import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from "../api/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "ashish",
    email: "ash@gmail.com",
    password: "abc",
    password2: "abc",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  /*******************
   * EVENT HANDLERS
   ******************/

  const handleChange = (evt) => {
    //console.log(evt);
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // client side Validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });

      signup(data)
        .then((response) => {
          console.log("Axios signup success", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error:", err);
          setFormData({
            ...formData,
            loading: false,
          });
        });
    }
  };

  /*******************
   * VIEWS
   ******************/
  const ShowSignUpForm = () => (
    <div className="signup-form">
      <form
        action="/examples/actions/confirmation.php"
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-user"></span>
              </span>
            </div>
            <input
              name="username"
              value={username}
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              required="required"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-paper-plane"></i>
              </span>
            </div>
            <input
              name="email"
              value={email}
              type="email"
              className="form-control"
              name="email"
              placeholder="Email Address"
              required="required"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              name="password"
              value={password}
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required="required"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
                <i className="fa fa-check"></i>
              </span>
            </div>
            <input
              name="password2"
              value={password2}
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              required="required"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-check-label">
            <input type="checkbox" required="required" /> I accept the{" "}
            <Link to="#">Terms of Use</Link> &amp;{" "}
            <Link to="#">Privacy Policy</Link>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        Already have an account? <Link to="/SignIn">Login here</Link>
      </div>
    </div>
  );
  return (
    <div className="signup-container">
      <div className="row vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-2"> {showLoading()}</div>}
          {ShowSignUpForm()}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
