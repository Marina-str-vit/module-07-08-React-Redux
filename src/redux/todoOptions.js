//https://67b37562392f4aa94fa74786.mockapi.io/tasks   === це сайт для прикладу, часто використ. його тестувальників

import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

// тут ми або отримаємо дані або ні, більше нічого ніякі лоадери

axios.defaults.baseURL = 'https://67b37562392f4aa94fa74786.mockapi.io';

// в useEffect щось створили, див ТодоЛіст строка 23:  dispatch(fetchData({ signal: abortController.signal }, { signal } сюди передали 
// fetchData - довільна назва функції
// createAsyncThunk - все бере на себе     //назва action      // якщо  { signal } він же body не потрібен ставимо  _, (нижнє підкреслення)
export const fetchData = createAsyncThunk('todos/fetchData', async ({ signal }, thunkAPI) => {
  try {
    const { data } = await axios.get(`/tasks`, { signal });
    return data; // отримали дані і тепер todoSlict їх повинен опрацювати
  } catch (error) {
    // це потрібно, що було видно error, бо звичайно помилка буде прийматися як стан fulfilled!!!
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
  try {
    await axios.delete(`/tasks/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTodo = createAsyncThunk('todos/addTodo', async (body, thunkAPI) => {
  try {
    const { data } = await axios.post('/tasks', body);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editTodo = createAsyncThunk('todos/editTodo', async (body, thunkAPI) => {
  try {
    const { data } = await axios.put(`/tasks/${body.id}`, body);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//=====це підкапотний стан , як саме працюють createAsyncThunk, АЛЕ ЗАРАЗ використ. toolkit, тому дивитися приклад вище!!
    // ця фенкц. повертає стару функю проісходе замикання
// export const fetchData = additional_data => async dispatch => {
//   try {
//     dispatch(setIsError(false));
//     dispatch(setIsLoading(true));
//     const response = await axios.get('https://67b37562392f4aa94fa74786.mockapi.io/tasks');
//     dispatch(fetchDataSuccess(response.data));
//   } catch {
//     dispatch(setIsError(true));
//   } finally {
//     dispatch(setIsLoading(false));
//   }
// };