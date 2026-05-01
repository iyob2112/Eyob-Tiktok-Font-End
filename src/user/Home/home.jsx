import { useState } from 'react';
import './home.css';
import BottomBar from '../BottomBar';
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('TIKTOK');

    const platformIcons = {
        TIKTOK: <FaTiktok size={22} />,
        INSTAGRAM: <FaInstagram size={22} />,
        FACEBOOK: <FaFacebook size={22} />,
    };
    const navigate = useNavigate();
    const allTasks = {
        TIKTOK: [
            { id: 1, name: 'comment', category: 'TIKTOK', Rewards: '50$', color: '#ff0050' },
            { id: 2, name: 'Like video', category: 'TIKTOK', Rewards: '30$', color: '#ff0050' },
            { id: 3, name: 'Share video', category: 'TIKTOK', Rewards: '80$', color: '#00f2ea' },
            { id: 4, name: 'Follow account', category: 'TIKTOK', Rewards: '70$', color: '#00f2ea' },
        ],
        INSTAGRAM: [
            { id: 1, name: 'comment', category: 'INSTAGRAM', Rewards: '40$', color: '#c13584' },
            { id: 2, name: 'Like video', category: 'INSTAGRAM', Rewards: '50$', color: '#e1306c' },
            { id: 3, name: 'Share video', category: 'INSTAGRAM', Rewards: '50$', color: '#fd1d1d' },
            { id: 4, name: 'Follow account', category: 'INSTAGRAM', Rewards: '50$', color: '#f56040' },
        ],
        FACEBOOK: [
            { id: 1, name: 'comment', category: 'FACEBOOK', Rewards: '50$', color: '#1877f2' },
            { id: 2, name: 'Like video', category: 'FACEBOOK', Rewards: '50$', color: '#1877f2' },
            { id: 3, name: 'Share video', category: 'FACEBOOK', Rewards: '50$', color: '#1877f2' },
            { id: 4, name: 'Follow account', category: 'FACEBOOK', Rewards: '50$', color: '#1877f2' },
        ],
    };

    return (
        <>
            <div className="app-viewport0">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>

                <div className="glass-container">
                    <aside className="sidebar">
                        <div className="user-profile">
                            <div className="avatar-glow"></div>
                        </div>

                        <nav className="side-nav">
                            {['TIKTOK', 'INSTAGRAM', 'FACEBOOK'].map((platform) => (
                                <div
                                    key={platform}
                                    className={`nav-item ${activeTab === platform ? 'active' : ''}`}
                                    onClick={() => setActiveTab(platform)}
                                >
                                    {platformIcons[platform]}
                                    <span>{platform}</span>
                                </div>
                            ))}
                        </nav>
                    </aside>

                    <main className="content-area">
                        <header className="main-header">
                            <div>
                                <div className="platform-icon">

                                    {platformIcons[activeTab]}
                                </div>
                                <h1>{activeTab} Tasks</h1>
                                <p className="subtitle">Complete actions to earn rewards</p>
                            </div>
                            <div className="coin-pill">
                                <span className="coin-icon">🪙</span>
                                <span>Get More Coin</span>
                            </div>
                        </header>

                        <section className="task-grid">
                            {allTasks[activeTab].map((task) => (
                                <div key={task.id}
                                    className="glass-card"
                                  onClick={() =>
  navigate('/task-details', {
    state: {
      category: task.category,
 taskType:
  task.name === "comment"
    ? "Comment"
    : task.name === "Like video"
    ? "Like Video"
    : "Follow Account"
    }
  })
}>
                                    <div className="card-shine"></div>
                                    <div className="card-top">
                                        <span
                                            className="category-label"
                                            style={{ color: task.color }}
                                        >
                                            {task.category}
                                        </span>
                                        <span className="percent">{task.Rewards}</span>
                                    </div>

                                    <h3 className="task-name">{task.name}</h3>

                                    <div className="progress-wrapper">
                                        <div className="progress-bar-bg">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: task.progress,
                                                    backgroundColor: task.color,
                                                    boxShadow: `0 0 10px ${task.color}`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </main>
                </div>
            </div>

            <BottomBar />
        </>
    );
};

export default HomePage;