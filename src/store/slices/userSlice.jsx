import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    isLoggedIn: false,
    loading: false
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isLoggedIn = true
      state.name = action.payload.name
    },
    loginFailure: (state) => {
      state.loading = false
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.name = ''
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer
