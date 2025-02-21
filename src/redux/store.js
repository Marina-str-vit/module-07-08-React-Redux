import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todoSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer,
  },
});