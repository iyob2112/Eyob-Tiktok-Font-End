import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    const payload = {
      fullname: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      await api.post("/auth/signup", payload);

      alert("Signup successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }finally {
    setLoading(false); // ✅ THIS FIXES YOUR BUTTON
  }
    console.log(formData);

  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>EYOB</h1>
        <h2>Create Account</h2>

        <div className="Email">
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Email">
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Email">
          <p>Email Address</p>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Email">
          <p>Phone Number</p>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Password">
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Password">
          <p>Confirm Password</p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
{/* 
        <button
          type="submit"
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button> */}
        <button type="submit" disabled={loading || !formData.email || !formData.password}>
  {loading ? (
    <>
      <div className="spinner"></div>
      <span>Loading...</span>
    </>
  ) : (
    "Sign Up"
  )}
</button>

        <div className="SignUp">
          <p>Already have an account?</p>
          <a href="/" onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}>
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;