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

export const selectAllOffers = (state) => state.offers.offers
export const selectCreatedOffers = (state, userId) =>
  state.offers.offers.filter(
    (offer) => offer.university_id_src === userId && offer.status === 0
  )
export const selectSentOffers = (state, userId) =>
  state.offers.offers.filter(
    (offer) =>
      offer.university_id_src === userId &&
      offer.status === 1 &&
      offer.status === 2
  )
export const selectObtainedOffers = (state, userId) =>
  state.offers.offers.filter(
    (offer) =>
      offer.university_id_des === userId &&
      offer.status === 1 &&
      offer.status === 2
  )

export const selectOfferById = (state, id) => {
  const offer = state.offers.offers.find((offer) => offer.id === +id)
  return offer
}

export default offersSlice.reducer
