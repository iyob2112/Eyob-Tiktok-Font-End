import { useEffect, useState } from "react";
import "./withdrawadmin.css";
import BottomBar from "../BottomBar";
import api from "../../services/api";

const AdminWithdraw = () => {
  const [requests, setRequests] = useState([]);

  // LOAD DATA
  useEffect(() => {
    const fetchWithdraws = async () => {
      try {
        const res = await api.get("/withdraw-requests");
        setRequests(res.data);
      } catch (error) {
        alert(error.response?.data?.message);
      }
    };
    fetchWithdraws();
  }, []);


  // APPROVE
  const approve = async (id) => {
    try {
      await api.put(`/withdraw-requests/${id}/approve`);
      setRequests(requests.filter((r) => r._id !== id));
      alert("Approved");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // REJECT
  const reject = async (id) => {
    try {
      await api.put(`/withdraw-requests/${id}/reject`);
      setRequests(requests.filter((r) => r._id !== id));
      alert("Rejected");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <>
  <div className="app-viewport">
  <div className="admin-page">
    <h2 className="h-1">Withdraw Requests</h2>

    <div className="list">
      {requests.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#64748b" }}>No pending requests</p>
      ) : (
        requests.map((r) => (
          <div key={r._id} className="card">
            <div className="list1">
              <h3 className="h3-W">{r.userId?.fullname || "Unknown User"}</h3>
              <p className="email-text">{r.userId?.email}</p>
              <div className="info-row">
                <span>Account:</span>
                <span className="account-num">{r.accountNumber}</span>
              </div>
              <p className="amount-text"> Birr {r.amount}</p>
              <span className={`status-badge ${r.status || "pending"}`}>
                {r.status || "pending"}
              </span>
            </div>

            <div className="btn-group-withdraw">
              <button className="approve-btn" onClick={() => approve(r._id)}>
                Approve
              </button>

              <button className="reject-btn" onClick={() => reject(r._id)}>
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>

      <BottomBar />
    </>
  );
};

export default AdminWithdraw;