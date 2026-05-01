import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./taskdetails.css";
import api from "../../services/api";

const TaskDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks/filter", {
          params: {
            category: state?.category,
            taskType: state?.taskType,
          },
        });

        console.log("API RESPONSE:", res.data);

        setTasks(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load tasks");
      }
    };

    fetchTasks();
  }, [state?.category, state?.taskType]); // IMPORTANT FIX

  return (
    <div className="app-viewport-T">

      <div className="task-container">

        <div className="task-header">
          <button onClick={() => navigate(-1)}>← Back</button>

          <h1>
            {state?.category} - {state?.taskType}
          </h1>
        </div>

        <div className="link-list">

          {tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="link-card"
                onClick={() =>
  navigate("/instruction", {
    state: {
      taskType: task.taskType,
      link: task.link,
      reward: task.reward,
    },
  })
}
              >
                <span>{task.taskType}</span>
                <div>🪙 {task.reward}</div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default TaskDetails;