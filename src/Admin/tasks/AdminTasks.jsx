import { useEffect, useState } from "react";
import "./tasksadmin.css";
import BottomBar from "../BottomBar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load tasks");
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <div className="app-viewport1">
        <div className="admin-page">
          <h2 className="admin-title">Task Controller</h2>

          <button
            className="addtask-btn"
            onClick={() => navigate("/admin/add-task")}
          >
            <span className="plus-icon">+</span> Add New Task
          </button>

          <div className="task-list-wrapper">
            {tasks.length === 0 ? (
              <p className="empty-msg">No tasks available. Create one!</p>
            ) : (
              tasks.map((t) => (
                <div key={t._id} className="task-card">
                  <div className="task-main-info">
                    <div className="task-category-icon">
                      {t.category?.charAt(0)}
                    </div>
                    
                    <div className="task-details">
                      <div className="task-header-row">
                        <h3 className="cat-name">{t.category}</h3>
                        <span className="task-badge">{t.taskType}</span>
                      </div>
                      <p className="task-url">{t.link}</p>
                      <div className="task-reward-pill">
                        🪙 {t.reward} Coins
                      </div>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      className="edit-task-btn"
                      onClick={() =>
                        navigate("/admin/edit-task", {
                          state: {
                            id: t._id,
                            category: t.category,
                            taskType: t.taskType,
                            link: t.link,
                            reward: t.reward,
                          },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-task-btn"
                      onClick={() => deleteTask(t._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default AdminTasks;