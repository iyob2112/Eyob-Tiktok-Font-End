
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
function App() {
   return (
    <BrowserRouter>
      <Routes>
         {/* USER ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/home" element={<Home />} />
         <Route path="/task-details" element={<TaskDetails />} />
         <Route path="/instruction" element={<TaskInstruction />} />



           {/* ADMIN ROUTES */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/withdraws" element={<AdminWithdraw />} />
        <Route path="/admin/user-edit" element={<UserEdit />} />
        <Route path="/admin/add-task" element={<AddTaskPage />} />
        <Route path="/admin/edit-task" element={<EditTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;