import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, markAsCompleted, reorderTasks } from '../redux/taskSlice';
import TaskForm from './TaskForm';
import ConfirmationModal from './ConfirmationModal';
import FilterBar from './FilterBar';
import { Link } from 'react-router-dom';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const searchQuery = useSelector((state) => state.tasks.searchQuery); // Get search query from Redux state

  const [editTask, setEditTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      if (filter === 'overdue') return new Date(task.dueDate) < new Date();
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('dragIndex');
    if (dragIndex !== dropIndex) {
      const reorderedTasks = [...filteredTasks];
      const [draggedTask] = reorderedTasks.splice(dragIndex, 1);
      reorderedTasks.splice(dropIndex, 0, draggedTask);
      dispatch(reorderTasks(reorderedTasks)); // Dispatch reorder action
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const closeEditMode = () => {
    setEditTask(null);
  };

  return (
    <div className="bg-slate-900 mt-6 w-[95%] md:w-[88%] mx-auto rounded-lg py-2 shadow-lg">
      <h3 className="text-white text-lg font-serif text-center mb-4">Task List</h3>
      <FilterBar /> 
      {editTask ? (
        <TaskForm taskToEdit={editTask} closeEditMode={closeEditMode} />
      ) : (
        <>
          {filteredTasks.length > 0 ? (
            <div className="overflow-y-auto min-h-[35vh] max-h-[35vh]  gap-4 pb-4 hide-scrollbar">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex flex-col lg:flex-row justify-between items-start gap-0 md:gap-2 lg:gap-0 w-[90%] mx-auto bg-slate-800 rounded-lg p-4 mb-3 shadow-lg transition-all duration-300 ${
                  task.completed ? 'bg-green-600' : 'hover:bg-slate-700'
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Link to={`/tasks/${task.id}`} className="flex-grow w-full sm:w-auto">
                  <div className="text-white">
                    <h4 className="text-lg font-bold cursor-pointer hover:text-blue-400 truncate max-w-full">
                      {task.title}
                    </h4>
                    <p className="text-sm text-slate-300 py-1 truncate max-w-full sm:max-w-[80%]">
                      {task.description}
                    </p>
                    <p className="text-sm text-slate-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                    {task.completed && <p className="text-green-300 text-sm">Completed</p>}
                  </div>
                </Link>
          
                <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-4 md:ml-0">
                  {!task.completed && (
                    <button
                      className="bg-green-500 px-3 py-1 rounded-full text-white hover:bg-green-600 transition-all duration-300"
                      onClick={() => dispatch(markAsCompleted(task.id))}
                    >
                     Mark as Completed
                    </button>
                  )}
                  <button
                    className="bg-yellow-500 px-3 py-1 rounded-full text-white hover:bg-yellow-600 transition-all duration-300"
                    onClick={() => handleEdit(task)}
                  >
                    <img src="./assets/edit.svg" alt="Edit" className="w-5 h-5" />
                  </button>
                  <button
                    className="bg-red-500 px-3 py-1 rounded-full text-white hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDeleteClick(task.id)}
                  >
                    <img src="./assets/delete.svg" alt="Delete" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          
          ) : (
            <p className="text-center text-slate-400 min-h-[34vh]">No tasks available</p>
          )}
        </>
      )}
      <ConfirmationModal
        show={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default TaskList;
