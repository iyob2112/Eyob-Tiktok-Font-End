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
      <div className="edit-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>Edit User</h2>

        <div className="edit-card">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Coins</label>
          <input
            type="number"
            value={coins}
            onChange={(e) => setCoins(e.target.value)}
          />

          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;