import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
// eslint-disable-next-line 
const OFFERS_URL = "http://localhost:3500/offer/show_offer"
const CREATE_OFFER_URL = "http://localhost:3500/offer/insert_offer"
const OWN_OFFERS_URL = "http://localhost:3500/offer/own-offers"
const OBTAINED_OFFER_URL = "http://localhost:3500/offer/obtained-offers"
const ACTIVE_OFFERS_URL = "http://localhost:3500/offer/active-offers"
const ENDED_OFFERS_URL = "http://localhost:3500/offer/ended-offers"
const SEND_OFFER_URL = "http://localhost:3500/offer/send-offer"

const initialState = {
  offers: [],
  status: "idle",
  error: null,
  createOfferState: {
    status: null,
    error: null
  },
  SendOfferState: {
    status: null,
    error: null
  }
}

export const createOffer = createAsyncThunk("offers/createOffer", async (offerData) => {
  let response
  try {
    response = await axios.post(CREATE_OFFER_URL, offerData,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
    return response.data
  } catch (err) {
    console.log(err)
  }

})

// getAllOffers
export const fetchAllOffers = createAsyncThunk("offers/getOffers", async () => {
  try {
    const response = await axios.get(OFFERS_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
})

export const fetchOwnOffer = createAsyncThunk("offers/getOwnOffers", async () => {
  try {
    const response = await axios.get(OWN_OFFERS_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const fetchObtainedOffer = createAsyncThunk("offers/getObtainedOffers", async () => {
  try {
    const response = await axios.get(OBTAINED_OFFER_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const fetchActiveOffers = createAsyncThunk("offers/getActiveOffers", async () => {
  try {
    const response = await axios.get(ACTIVE_OFFERS_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const fetchEndedOffers = createAsyncThunk("offers/getEndedOffers", async () => {
  try {
    const response = await axios.get(ENDED_OFFERS_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const sendOffer = createAsyncThunk("offers/sendOffer", async (offerData) => {
  try {
    const response = await axios.post(SEND_OFFER_URL, offerData, {
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
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchOwnOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
      })
      .addCase(fetchOwnOffer.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchObtainedOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
      })
      .addCase(fetchObtainedOffer.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchActiveOffers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
      })
      .addCase(fetchActiveOffers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchEndedOffers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
      })
      .addCase(fetchEndedOffers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        if (action.payload.state === 400) {
          state.createOfferState.status = null
          state.createOfferState.error = action.payload.message
        } else {
          state.createOfferState.status = "succeeded"
          state.createOfferState.error = null
        }

      })
      // eslint-disable-next-line
      .addCase(createOffer.rejected, (state, action) => {
        state.createOfferState.status = null
        state.createOfferState.error = action.payload.data.message
      })
      .addCase(sendOffer.fulfilled, (state, action) => {
        if (action.payload.state === 400) {
          state.SendOfferState.status = null
          state.SendOfferState.error = action.payload.message
        } else {
          state.SendOfferState.status = "succeeded"
          state.SendOfferState.error = null
        }

      })
      .addCase(sendOffer.rejected, (state, action) => {
        state.SendOfferState.status = null
        state.SendOfferState.error = action.payload.data.message
      }
      )

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

export const selectCreateOfferState = (state) => state.offers.createOfferState

export default offersSlice.reducer
