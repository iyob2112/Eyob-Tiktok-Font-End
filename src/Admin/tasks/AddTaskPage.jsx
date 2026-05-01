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
    alert(error.response?.data?.message);
  }
};

  return (
    <div className="app-viewport1">
      <div className="add-task-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2>Add New Task</h2>

        <div className="task-form">
          <label>Choose Category</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
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
            <option>SHARE</option>
          </select>

          <label>Video / Account Link</label>
          <input
            type="text"
            placeholder="Paste link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <label>Coin Reward</label>
          <input
            type="number"
            placeholder="Enter reward"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />

          <button className="submit-btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;