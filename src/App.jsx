
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./user/UserProfile/UserProfile";
import Withdraw from "./user/Withdraw/withdraw";
import Home from "./user/Home/home";
import TaskDetails from "./user/TaskDetails/TaskDetails";
import TaskInstruction from "./user/TaskInstruction/TaskInstruction";


import AdminUsers from "./Admin/users/AdminUsers";
import AdminTasks from "./Admin/tasks/AdminTasks";
import AdminWithdraw from "./Admin/withdraws/AdminWithdraw";


import UserEdit from "./Admin/users/UserEdit";
import AddTaskPage from "./Admin/tasks/AddTaskPage";
import EditTaskPage from "./Admin/tasks/EditTaskPage";
import ProtectedRoute from "./services/ProtectedRoute";
import AdminRoute from "./services/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER PROTECTED */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/UserProfile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />

        <Route path="/withdraw" element={
          <ProtectedRoute>
            <Withdraw />
          </ProtectedRoute>
        } />

        <Route path="/task-details" element={
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        } />

        <Route path="/instruction" element={
          <ProtectedRoute>
            <TaskInstruction />
          </ProtectedRoute>
        } />

        {/* ADMIN PROTECTED */}
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />

        <Route path="/admin/tasks" element={
          <AdminRoute>
            <AdminTasks />
          </AdminRoute>
        } />

        <Route path="/admin/withdraws" element={
          <AdminRoute>
            <AdminWithdraw />
          </AdminRoute>
        } />

        <Route path="/admin/user-edit" element={
          <AdminRoute>
            <UserEdit />
          </AdminRoute>
        } />

        <Route path="/admin/add-task" element={
          <AdminRoute>
            <AddTaskPage />
          </AdminRoute>
        } />

        <Route path="/admin/edit-task" element={
          <AdminRoute>
            <EditTaskPage />
          </AdminRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}
export default App;