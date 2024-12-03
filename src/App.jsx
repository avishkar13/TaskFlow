import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskDashboard from "./Components/TaskDashboard";
import TaskDetails from "../Components/TaskDetails";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <BrowserRouter>
       
        <div className="min-h-screen w-full bg-black">
         <Navbar/>
        <Routes>
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/tasks/:id" element={<TaskDetails/>} />
          <Route path="*" element={<Navigate to="/tasks" />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

