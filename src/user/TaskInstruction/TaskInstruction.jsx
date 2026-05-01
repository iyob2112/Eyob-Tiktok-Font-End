import { useLocation, useNavigate } from "react-router-dom";
import "./taskinstruction.css";

const TaskInstruction = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-viewport-I">
      <div className="instruction-container">

        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <p className="reward-text">🪙 {state?.reward}</p>
        </div>

        <h1 className="h1-W">{state?.taskType}</h1>

        <div className="steps">
          <p><strong>Step 1:</strong> Open the link</p>
          <p><strong>Step 2:</strong> Complete the action</p>
          <p><strong>Step 3:</strong> Take proof (screenshot)</p>
        </div>

        <div className="buttons">
          <a
            href={state?.link}
            target="_blank"
            rel="noreferrer"
            className="video-btn"
          >
            Open Task
          </a>

          <a
            href="https://t.me/yourtelegram"
            target="_blank"
            rel="noreferrer"
            className="telegram-btn"
          >
            Submit Proof
          </a>
        </div>

      </div>
    </div>
  );
};

export default TaskInstruction;