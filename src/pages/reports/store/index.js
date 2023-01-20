import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const getReportsData = createAsyncThunk()

export const uploadUniversityReport = createAsyncThunk(
  "evaluationReport/uploadUniversityReport",
  async (data) => {
    console.log(data)
    const response = await axios.post(
      "http://localhost:3500/offer/insert_evaluation",
      data,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)

export const uploadStudentReport = createAsyncThunk()

export const evaluationReportSlice = createSlice({
  name: "evaluationReport",
  initialState: {
    allData: {},
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOffersData.fulfilled, (state, action) => {
      state.allData.offers = action.payload
      state.selectedOffer.offer = null
      state.selectedOffer.university = null
      state.isLoading = false
    })
  }
})
