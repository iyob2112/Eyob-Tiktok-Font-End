// import { useNavigate } from "react-router-dom";
// import "./BottomBar.css";

// function BottomBar() {
//   const navigate = useNavigate();

//   return (
//     <div className="bottom-bar">
//       {/* <button onClick={() => navigate("/")}>Home</button> */}
//       <button onClick={() => navigate("/UserProfile")}>Profile</button>
//       <button onClick={() => navigate("/withdraw")}>withdraw</button>
//     </div>
//   );
// }

// export default BottomBar;


import { NavLink } from "react-router-dom";
import "./BottomBar.css";

function BottomBar() {
  return (
    <div className="bottom-bar">
      <NavLink to="/home" className="nav-btn">
        Home
      </NavLink>
      <NavLink to="/UserProfile" className="nav-btn">
        Profile
      </NavLink>

      <NavLink to="/withdraw" className="nav-btn">
        Withdraw
      </NavLink>

    </div>
  );
}

export default BottomBar;