import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { markAsCompleted, deleteTask } from "../redux/taskSlice"; 
import { Link } from "react-router-dom";
import ConfirmationModal from "../Components/ConfirmationModal"
import TaskForm from "../Components/TaskForm";


function TaskDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));

  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!task) {
    return <div className="text-center text-white mt-8">Task not found!</div>;
  }

  const handleMarkAsCompleted = () => {
    dispatch(markAsCompleted(task.id));
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowDeleteModal(false);
    navigate("/tasks");
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <Link className="text-white flex justify-end p-4" to="/tasks">
        <span className="underline hover:scale-105 hover:text-slate-300">Dashboard</span>
      </Link>
      <div className="bg-slate-800 mt-6 w-[90vw] mx-auto rounded-lg py-4 px-6 shadow-lg">
        {editMode ? (
          <TaskForm taskToEdit={task} closeEditMode={toggleEditMode} />
        ) : (
          <>
            <h2 className="text-white text-2xl font-bold mb-4 truncate ">{task.title}</h2>
            <p className="text-slate-300 text-lg mb-2 ">{task.description}</p>
            <p className="text-slate-400">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className={`mb-4 ${task.completed ? "text-green-400" : "text-yellow-400"}`}>
              Status: {task.completed ? "Completed" : "Pending"}
            </p>

            <div className="flex gap-4 mt-4">
              {!task.completed && (
                <button
                  className="bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600"
                  onClick={handleMarkAsCompleted}
                >
                  Mark as Complete
                </button>
              )}
              <button
                className="bg-yellow-500 px-4 py-2 rounded-full text-white hover:bg-yellow-600"
                onClick={toggleEditMode}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded-full text-white hover:bg-red-600"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        show={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default TaskDetails;
