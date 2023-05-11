import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload) // добавляем элементы в наш массив, который будет в корзине
    //   state.totalPrice = state.items.reduce((acc, item) => item.price + acc, 0) // и в момент добавления мы будем вычислять сумму товаров.
    // },
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id) // находим нужный объект в массиве
      if (findItem) {
        findItem.count++ // увеличиваем на 1
      } else {
        state.items.push({
          ...action.payload,
          count: 1, // ЕСЛИ НЕ НАЙДЕН -  поменял для того, чтобы объект не дублировался.
        }) // добавляем элементы в наш массив, который будет в корзине
      }
      state.totalPrice = state.items.reduce((acc, item) => item.price + acc, 0) // и в момент добавления мы будем вычислять сумму товаров.
    },

    removeItem(state, action) {
      state.items.filter((item) => item.id !== action.payload)
    },
    clearItem(state, action) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, clearItem } = cartSlice.actions

export default cartSlice.reducer
