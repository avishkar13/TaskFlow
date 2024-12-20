import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const loadTasksFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  } catch (error) {
    return [];
  }
};

const loadFilterFromLocalStorage = () => {
  return localStorage.getItem('filter') || 'all';
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  filter: loadFilterFromLocalStorage(),
  searchQuery: '', 
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, description, dueDate } = action.payload;
      const newTask = {
        id: nanoid(),
        title,
        description,
        dueDate,
        completed: false,
      };
      state.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      toast.success('Task Added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    },
    editTask: (state, action) => {
      const { id, updatedData } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = updatedData.title || task.title;
        task.description = updatedData.description || task.description;
        task.dueDate = updatedData.dueDate || task.dueDate;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        toast.success('Task Edited ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }else{
        toast.error('Unable to Edit Task', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      toast.success('Task Deleted !!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    },
    markAsCompleted: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = true;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
      toast.success('Marked as Completed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      localStorage.setItem('filter', action.payload);
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, markAsCompleted, setFilter, reorderTasks, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
