import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./useradmin.css";
import BottomBar from "../BottomBar";
import api from "../../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <div className="app-viewport">
        <div className="admin-page">
          <h2 className="admin-title">User Management</h2>

          <div className="user-list-container">
            {users.map((u) => (
              <div key={u._id} className="user-card">
                <div className="user-info-section">
                  {/* Avatar Circle */}
                  <div className="user-avatar">
                    {u.fullname.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="user-details">
                    <h3 className="user-name">{u.fullname}</h3>
                    <p className="user-email">{u.email}</p>
                    <p className="user-phone">{u.phone || "No phone"}</p>
                    <div className="user-coin-badge">
                      <span className="coin-icon">🪙</span> {u.coins} Coins
                    </div>
                  </div>
                </div>

                <div className="user-actions">
                  <button
                    className="edit-action-btn"
                    onClick={() =>
                      navigate("/admin/user-edit", {
                        state: {
                          id: u._id,
                          name: u.fullname,
                          email: u.email,
                          coins: u.coins,
                          phone: u.phone,
                          role: u.role
                        },
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-action-btn"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default AdminUsers;