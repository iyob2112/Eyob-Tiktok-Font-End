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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

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
          <h2>Users</h2>

          <div className="list">
            {users.map((u) => (
              <div key={u._id} className="card">
                <div className="list1">
                  <h3 className="h3-U">{u.fullname}</h3>
                  <p>{u.email}</p>
                  <p>{u.phone}</p>
                  <p>🪙 {u.coins}</p>
                </div>

                <button
                  className="btn"
                  onClick={() =>
                    navigate("/admin/user-edit", {
                      state: {
                        id: u._id,
                        name: u.fullname,
                        email: u.email,
                        coins: u.coins,
                        phone: u.phone,
                      },
                    })
                  }
                >
                  View / Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
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