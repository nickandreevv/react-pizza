import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, currentPage, sort } = params
    const mockapiResponce = await axios.get(
      `https://63f4babd3f99f5855db60353.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}${search}&sortBy=${sort}&order=desc`
    )
    return mockapiResponce.data // перенесли логику отправки запроса в редакс для того, чтобы переиспользовать функцию
    // и в комп. home мы просто ТУПО будем вызывать функ. fecthPizzas в dispatch
  }
) // pizza/fetchPizzasStatus - префикс создается для того, чтобы редакс корректно определял какое действие нужно сделать

const initialState = {
  items: [],
  status: 'loading', // загрузка | выполнено | отклонено
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  }, // выносим логику локального state из Home сюда.
  // тут и будем добавлять в пустой массив пиццы из бэка
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizzas.pending]: (state, action) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    },
  }, // после того, как мы сделали запрос и чтобы данные появлялись, нужно писать extraReducers
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
