import React from 'react';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';

function TaskDashboard() {
  return (
    <main
      className="bg-slate-800 min-h-[100vh] md:min-h-[88vh] w-[95vw] md:w-[90vw] mx-auto mt-2 py-4"
      aria-label="Task Management Dashboard"
    >
      
     <TaskForm/>
     <TaskList/>
    </main>
  );
}

export default TaskDashboard;
