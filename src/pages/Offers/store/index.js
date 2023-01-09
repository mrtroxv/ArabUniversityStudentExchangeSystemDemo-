// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const getOffersData = createAsyncThunk(
  "appOffers/getAllData",
  async () => {
    const response = await axios.get(
      "http://localhost:3500/admin/get-all-data",
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)

export const getData = createAsyncThunk("appOffers/getData", async (params) => {
  const response = await axios.get("/api/users/list/data", params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getOffer = createAsyncThunk("appOffers/getOffer", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3500/admin/get-user`, {
      params: {
        userId: id
      },
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const appUsersSlice = createSlice({
  name: "appOffers",
  initialState: {
    allData: [],
    selectedOffer: null,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOffersData.fulfilled, (state, action) => {
        state.allData = action.payload
        state.isLoading = false
      })
      .addCase(getOffersData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.selectedOffer = action.payload
        state.isLoading = false
      })
      .addCase(getOffer.pending, (state) => {
        state.isLoading = true
      })
  }
})

export default appUsersSlice.reducer
