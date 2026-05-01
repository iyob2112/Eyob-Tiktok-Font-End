import { useEffect, useState } from "react";
import "./UserProfile.css";
import BottomBar from "../BottomBar";
import api from "../../services/api";

const UserProfile =  () => {
   const [profile, setProfile] = useState(null);

     useEffect(() => {
       const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User ID:", user); // Debug log

      const res = await api.get(`/users/${user.id}`);

      setProfile(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load profile");
    }
  };
   fetchProfile();
  }, []);




  if (!profile) {
    return <h2>Loading...</h2>;
  }
    const fullName = profile.fullname?.split(" ") || [];
  const firstName = fullName[0] || "";
  const lastName = fullName.slice(1).join(" ") || "";



  return (
    <>
  <div className="app-viewport-P">

    <div className="profile-card">
      <h1 className="profile-title">Profile</h1>
      <img
          src={profile.avatar || "https://images.unsplash.com/photo-1772371272174-392cf9cfabae?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
       alt={firstName}
        className="profile-avatar"
      />
      <div className="userinfo">
          <div className="profile-username">
            <div className="first-name">
            <p>First Name:</p>
           {firstName}
            </div>
             <div className="v-divider"></div>
            <div className="last-name">
            <p>Last Name:</p>
              {lastName}
             </div>
          </div>
          <div className="info-box profile-Email">
          

            <p>Email:</p>
            {profile.email}
        
          </div>
          <div className="info-box profile-phone">
            <p>Phone Number:</p>
            {profile.phone}
          </div>
          <div className="profile-coins">
            <div className="coins">
            <p>Coins:</p>
            {profile.coins}             
            </div>
            <div className="birr">
            <p>Birr:</p>
            {profile.coins * 0.5}
            </div>
          </div>

       
      </div>

   
    </div>
  </div>
      <BottomBar />
        </>
  );
};

export default UserProfile;