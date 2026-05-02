import { useState } from "react";
import BottomBar from "../BottomBar";
import "./Withdraw.css";
import api from "../../services/api";

function Withdraw() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // New Loading State

  const handleWithdraw = async () => {
    const numAmount = Number(amount);

    if (!account || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (numAmount < 50) {
      alert("Minimum withdraw amount is 50 Birr");
      return;
    }

    try {
      setLoading(true); // Start loading
      const user = JSON.parse(localStorage.getItem("user"));

      const data = {
        userId: user.id,
        accountNumber: account,
        amount: numAmount,
      };

      const res = await api.post("/withdraw", data);

      // Success logic
      setAccount("");
      setAmount("");
      
      // Local coin update
      const updatedUser = { ...user, coins: user.coins - numAmount };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="app-viewport-W">
      <div className="withdraw-page">
        <div className="withdraw-card">
          <div className="withdraw-header">
            <h1>Withdraw</h1>
            <p className="subtitle">Secure Payout</p>
          </div>

          <div className="input-container">
            <label>Account Number</label>
            <input
              type="text"
              placeholder="Bank or Wallet No."
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-container">
            <label>Amount (Birr)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
          </div>

          <p className="hint">Minimum withdrawal: 50 Birr</p>

          <button 
            className={`withdraw-btn ${loading ? "loading" : ""}`} 
            onClick={handleWithdraw}
            disabled={loading}
          >
            {loading ? <div className="btn-spinner"></div> : "Withdraw Funds"}
          </button>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default Withdraw;