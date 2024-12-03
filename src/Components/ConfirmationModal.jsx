import React from 'react';

function ConfirmationModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-200 p-6 rounded-md shadow-lg w-1/3">
        <h3 className="text-xl mb-4">Are you sure you want to delete this task?</h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
             Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
