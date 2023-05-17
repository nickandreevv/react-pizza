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
      state.totalPrice = state.items.reduce(
        (acc, item) => item.price * item.count + acc,
        0
      ) // и в момент добавления мы будем вычислять сумму товаров.
    }, // UPD: item.price * item.count + acc - сделал так, потому что при нажатии на одну пиццу
    // более 1 раза - счетчик не работал. Теперь мы берем стоимость пиццы, сколько раз ее добавили и
    // и прибавляем предыдущую сумму к этому

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
        state.totalPrice = state.items.price
      }
    }, // удаляем елемент. Находим нужный элемент -> если нашли - при клике уменьшаем count(счетчик)

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItem(state, action) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions

export default cartSlice.reducer
