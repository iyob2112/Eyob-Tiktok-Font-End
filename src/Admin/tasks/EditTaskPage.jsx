import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./addtask.css"; // Reusing the same CSS file for consistency
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
      <div className="admin-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>Edit Task</h2>

        <div className="task-form-card">
          <div className="input-group">
            <label>Choose Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="TIKTOK">TIKTOK</option>
              <option value="INSTAGRAM">INSTAGRAM</option>
              <option value="FACEBOOK">FACEBOOK</option>
              <option value="YOUTUBE">YOUTUBE</option>
            </select>
          </div>

          <div className="input-group">
            <label>Task Type</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option>Like Video</option>
              <option>Comment</option>
              <option>Follow Account</option>
              <option>SHARE</option>
            </select>
          </div>

          <div className="input-group">
            <label>Link</label>
            <input
              type="text"
              placeholder="Paste link here"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Coin Reward (🪙)</label>
            <input
              type="number"
              placeholder="Enter reward"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
            />
          </div>

          <button className="submit-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;