import { createSlice } from '@reduxjs/toolkit';
import { addTodo, deleteTodo, editTodo, fetchData } from './todoOptions';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

// !! slice лише синхронний, тому ми не можемо тут робити асинхрон.запити
const slice = createSlice({
  name: 'todos',
  initialState,
  //extraReducers - це всі екшени, що виконуються за межами, тобото коли приїхала машина і дві окреми людини пішли кожен за своїм товаром, що на складі.
  // УВАГА - присті Reducer вже не потрібні
  extraReducers: builder => {
  // можливо до тебе прийде fetchData, коли виконався стан фулфілд у тодоОпшионс
    builder
    //дані завантажилися
      .addCase(fetchData.fulfilled, (state, action) => {
        // все, що повернеться в тодоОпшионс див. строку 13, знаходиться зараз в payload
        state.items = action.payload;
        state.isLoading = false;
      })
      //дані завантажуються
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      // обробка помилки
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // видаляю тодо
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      // додаю новий тодо
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        // 1, Отримати айді і отримати новий текст
        // 2, Пробігти по масиву
        // 3,Знайти потрібний елемент по айді
        // 4, Поміняти отму елементу тайтл
        const item = state.items.find(item => item.id === action.payload.id);
        item.todo = action.payload.todo;
      });
  },
});

export const todoReducer = slice.reducer;
