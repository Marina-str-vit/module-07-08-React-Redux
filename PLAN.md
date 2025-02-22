# Як переїхати на `createAsyncThunk`

1. Створити файл `todosOps`
2. Записати в нього налаштування аксіос

```
axios.defaults.baseURL = 'https://67b37562392f4aa94fa74786.mockapi.io';
```

3. Створити першу санку

```
export const fetchData = createAsyncThunk('todos/fetchData', async (аргумент_1, аргумент_2) => {
  try {
    // запит на сервер
    const { data } = await axios.get(`/tasks`);
    return data;
  } catch (error) {
   // певернення помилки
    return thunkAPI.rejectWithValue(error.message);
  }
});

```

- аргумент_1 - body або інформація від компонента (новий контакт, айді для видалення або оновлюючі дані)
- аргумент_2 - набір інструментів (повернення помилок)

4.  В слайсі додати екстра редьюсери

```
extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const item = state.items.find(item => item.id === action.payload.id);
        item.todo = action.payload.todo;
      });
  },

```

- це допоможе нам синхронізувати дані між сервером і локальним клієнтом
- перехоплення будьяких інших екшенів з стороніх файлів

5. В компоненті маємо викликати екшен через діспатч

```
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
```

- це для нас ініціалізує запит на сервер - данні запишуться в стейт

6. Повторити з наступними санками