import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const OFFERS_URL = "http://localhost:3500/offer/show_offer"
const initialState = {
  offers: [],
  status: "idle",
  error: null
}

// getOffers
export const fetchOffers = createAsyncThunk("offers/getOffers", async () => {
  try {
    const response = await axios.get(OFFERS_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  }
})

export default offersSlice.reducer
export const selectAllOffers = (state) => state.offers.offers

export const selectOfferById = (state, id) => {
  return state.offers.offers.find((o) => {
    return o.id === +id
  })
}
