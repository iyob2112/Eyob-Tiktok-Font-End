import { useState } from "react";
import BottomBar from "../BottomBar";
import "./Withdraw.css";
import api from "../../services/api";


function Withdraw() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleWithdraw =  async() => {
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
    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      userId: user.id,
      accountNumber: account,
      amount: Number(amount),
    };

    const res = await api.post("/withdraw", data);

setAccount("");
setAmount("");
user.coins -= numAmount;
    alert(res.data.message);
  } catch (error) {
    alert(error.response?.data?.message);
  }
  };

  return (
      <div className="app-viewport-W">    
    <div className="withdraw-page">
      <div className="withdraw-card">

        <h1>Withdraw</h1>

        <input
          type="text"
          placeholder="Enter account number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount (min 50 Birr)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
<p className="hint">Minimum withdrawal: 50 Birr</p>
        <button onClick={handleWithdraw}>
          Withdraw
        </button>

      </div>
</div>
      <BottomBar />
    </div>
  );
}

export default Withdraw;