import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
}

export const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
  },
})

export const { setCurrentPage } = currentSlice.actions
export default currentSlice.reducer
