// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const changePassword = createAsyncThunk(
  "account/change-password",
  async (data) => {
    await axios.post("http://localhost:3500/account/change-password", data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
  }
)

export const appUsersSlice = createSlice({
  name: "account",
  initialState: {
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(changePassword.fulfilled, (state) => {
      state.isLoading = false
    })
  }
})

export default appUsersSlice.reducer
