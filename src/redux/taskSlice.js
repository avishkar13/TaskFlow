import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

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
  searchQuery: '', // Add searchQuery to the initial state
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
    },
    editTask: (state, action) => {
      const { id, updatedData } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = updatedData.title || task.title;
        task.description = updatedData.description || task.description;
        task.dueDate = updatedData.dueDate || task.dueDate;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    markAsCompleted: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = true;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
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
