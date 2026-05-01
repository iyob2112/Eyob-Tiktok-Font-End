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
      <NavLink to="/admin/users" className="nav-btn">
        Users
      </NavLink>
      <NavLink to="/admin/tasks" className="nav-btn">
        Task controller
      </NavLink>

      <NavLink to="/admin/withdraws" className="nav-btn">
        Withdraw requests
      </NavLink>

    </div>
  );
}

export default BottomBar;