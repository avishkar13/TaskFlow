import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../redux/taskSlice';

function FilterBar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  const [searchQuery, setSearchQueryState] = useState(''); 

  const handleSearchChange = (e) => {
    setSearchQueryState(e.target.value); 
    dispatch(setSearchQuery(e.target.value)); 
  };

  return (
    <div className="bg-slate-800 w-[95%] md:w-[72vw] mx-auto flex flex-col md:flex-row gap-3 md:gap-2 justify-between p-4 rounded-lg shadow-lg mb-2">
      <div className="flex items-center justify-center w-[100%] md:w-[40%] xl:w-[50%]">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks by title"
          className="w-full px-4 py-2 h-10 bg-slate-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        />
      </div>

      <div className="flex gap-2 xl:gap-4 items-center justify-center">
        <button
          className={`px-2 py-2 rounded-md text-white text-xs lg:text-lg transition-all duration-300 size-fit focus:bg-blue-800 ${
            filter === 'all' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={() => dispatch(setFilter('all'))}
        >
          All Tasks
        </button>
        <button
          className={`px-2 py-2 rounded-md text-white text-xs lg:text-lg transition-all duration-300 size-fit focus:bg-green-800 ${
            filter === 'completed' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={() => dispatch(setFilter('completed'))}
        >
          Completed
        </button>
        <button
          className={`px-2 py-2 rounded-md text-white text-xs lg:text-lg transition-all duration-300 size-fit focus:bg-yellow-800 ${
            filter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
          onClick={() => dispatch(setFilter('pending'))}
        >
          Pending
        </button>
        <button
          className={`px-2 py-2 rounded-md text-white text-xs lg:text-lg transition-all duration-300 size-fit focus:bg-red-800 ${
            filter === 'overdue' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
          }`}
          onClick={() => dispatch(setFilter('overdue'))}
        >
          Overdue
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
