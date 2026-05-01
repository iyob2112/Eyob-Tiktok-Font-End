import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./addtask.css";
import api from "../../services/api";

const EditTaskPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState(state?.category || "TIKTOK");
  const [taskType, setTaskType] = useState(state?.taskType || "Like Video");
  const [link, setLink] = useState(state?.link || "");
  const [reward, setReward] = useState(state?.reward || "");

  const handleSave = async () => {
    try {
      const updatedTask = {
        category,
        taskType,
        link,
        reward: Number(reward),
      };

      await api.put(`/tasks/${state.id}`, updatedTask);

      alert("Task updated successfully");
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="app-viewport1">
      <div className="add-task-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>Edit Task</h2>

        <div className="task-form">
          <label>Choose Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>TIKTOK</option>
            <option>INSTAGRAM</option>
            <option>FACEBOOK</option>
          </select>

          <label>Task Type</label>
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option>Like Video</option>
            <option>Comment</option>
            <option>Follow Account</option>
          </select>

          <label>Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <label>Coin Reward</label>
          <input
            type="number"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />

          <button className="submit-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;