import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./useredit.css";
import api from "../../services/api";

const UserEdit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState(state?.name || "");
  const [email, setEmail] = useState(state?.email || "");
  const [coins, setCoins] = useState(state?.coins || 0);
  const [phone, setPhone] = useState(state?.phone || "");

  const handleSave = async () => {
    try {
      const data = {
        fullname: name,
        email,
        coins: Number(coins),
        phone,
      };

      await api.put(`/users/${state.id}`, data);

      alert("User updated successfully");
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="app-viewport">
      {/* Container to handle layout within the viewport */}
      <div className="admin-page"> 
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>Edit User</h2>

        <div className="edit-card">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Coins (🪙)</label>
            <input
              type="number"
              placeholder="Amount"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;