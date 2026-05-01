import { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") {
        navigate("/admin/users");
      } else {
      navigate("/home");}
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
    console.log(formData);

    // navigate("/admin/users")
    // later connect backend API here
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>EYOB</h1>
        <h2>Welcom Back</h2>
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

        <button type="submit">Login</button>


        <div className="SignUp">
          <p>Are You Member?  </p> <a href="/signup"
           onClick={(e) => {
    e.preventDefault();
    navigate("/signup");
  }}
          > Sign UP</a>
        </div>
      </form>
    </div>
  );
}

export default Login;