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
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

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
          <h2>Task Controller</h2>

          <button
            className="addtask"
            onClick={() => navigate("/admin/add-task")}
          >
            Add Task
          </button>

          <div className="list">
            {tasks.map((t) => (
              <div key={t._id} className="card">
                <div className="list1">
                  <h3>{t.category}</h3>
                  <p>{t.taskType}</p>
                  <p>{t.link}</p>
                  <p>🪙 {t.reward}</p>
                </div>

                <div className="actions">
                  <button
                    className="btn danger"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn edit"
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

export default AdminTasks;