import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/taskSlice';

function TaskForm({ taskToEdit, closeEditMode }) {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [error, setError] = useState('');

  // Ensure the form updates when taskToEdit changes
  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate,
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.title && taskData.description && taskData.dueDate) {
      if (taskToEdit) {
        dispatch(editTask({
          id: taskToEdit.id,
          updatedData: taskData,
        }));
        closeEditMode();  // Close the form after edit
      } else {
        dispatch(addTask(taskData));
      }
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
      });
      setError(''); // Clear previous error
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="bg-slate-900 h-[20%] w-[95%] md:w-[88%] mx-auto rounded-lg py-3 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-white text-center font-serif text-xl mb-6">
        {taskToEdit ? 'Edit Task' : 'Task Management Dashboard'}
      </h2>
      <form className="h-[80%] w-[95%] md:w-[80%] mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="w-full h-10 px-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            type="text"
            placeholder="Enter Task Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            aria-label="Task Title"
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full h-10 px-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            type="text"
            placeholder="Enter Task Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            aria-label="Task Description"
            aria-required="true"
          />
        </div>

        <div className="mb-4 flex justify-between gap-4">
          <input
            className="w-52 h-10 px-3 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 cursor-pointer"
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            aria-label="Task Due Date"
            aria-required="true"
          />
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-green-500 flex justify-center  items-center gap-1 md:gap-2 px-3 md:px-8 py-2 rounded-full text-white text-lg font-mono hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          >
            <img className="w-5 h-5" src="./assets/save.svg" alt="Save" />
            <span>{taskToEdit ? 'Update' : 'Add'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
