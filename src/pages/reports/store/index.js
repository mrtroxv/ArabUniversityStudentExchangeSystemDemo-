import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const getReportsData = createAsyncThunk()

export const uploadUniversityReport = createAsyncThunk(
  "evaluationReport/uploadUniversityReport",
  async (data) => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }
)
export const uploadStudentReport = createAsyncThunk(
  "evaluationReport/uploadStudentReport",
  async (data, { dispatch }) => {
    try {
      await axios.post("http://localhost:3500/offer/insert_feedback", data, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      dispatch(getOffer(data.offerId))
    } catch (error) {
      console.log(error)
    }
  }
)

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
