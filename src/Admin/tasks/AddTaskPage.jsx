import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addtask.css";
import api from "../../services/api";

const AddTaskPage = () => {
  const [platform, setPlatform] = useState("TIKTOK");
  const [taskType, setTaskType] = useState("Like Video");
  const [link, setLink] = useState("");
  const [reward, setReward] = useState("");
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!link || !reward) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/add-task", {
        category: platform,
        taskType: taskType,
        link: link,
        reward: Number(reward),
      });

      alert("Task added successfully");
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add task");
    }
  };

  return (
    <div className="app-viewport1">
      <div className="admin-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>Add New Task</h2>

        <div className="task-form-card">
          <div className="input-group">
            <label>Choose Category</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
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
            <label>Video / Account Link</label>
            <input
              type="text"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Coin Reward (🪙)</label>
            <input
              type="number"
              placeholder="e.g. 50"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
            />
          </div>

          <button className="submit-btn" onClick={handleAddTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;