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
const DELETE_OFFER_URL = "http://localhost:3500/offer/delete-offer"
const REJECT_OFFER_URL = "http://localhost:3500/offer/reject-offer"

const initialState = {
  offers: [],
  status: "idle",
  error: null,
  createOfferState: {
    status: null,
    error: null
  },
  sendOfferState: {
    status: null,
    error: null
  },
  deleteOfferState: {
    status: null,
    error: null
  },
  rejectOfferState: {
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
    return response.data
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
export const deleteOffer = createAsyncThunk("offers/deleteOffer", async (offer_id) => {
  try {
    const response = await axios.post(DELETE_OFFER_URL, { offer_id }, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
)
export const rejectOffer = createAsyncThunk("offers/rejectOffer", async (offer_id) => {
  try {
    const response = await axios.post(REJECT_OFFER_URL, { offer_id }, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
)


const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    resetDeleteOfferState: (state) => {
      state.deleteOfferState.status = null
      state.deleteOfferState.error = null
    },
    deleteOfferFromStore: (state, action) => {
      state.offers = state.offers.filter(offer => offer.id !== action.payload)
    }
  },
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
          state.sendOfferState.status = null
          state.sendOfferState.error = action.payload.message
        } else {
          state.sendOfferState.status = "succeeded"
          state.sendOfferState.error = null
        }

      })
      .addCase(sendOffer.rejected, (state, action) => {
        state.sendOfferState.status = null
        state.sendOfferState.error = action.payload.data.message
      }
      )
      .addCase(deleteOffer.fulfilled, (state, action) => {
        if (action.payload.status === 404) {
          state.deleteOfferState.status = null
          state.deleteOfferState.error = action.payload.message
        } else {
          state.deleteOfferState.status = "succeeded"
          state.deleteOfferState.error = null
        }

      }
      )
      .addCase(deleteOffer.rejected, (state, action) => {
        state.deleteOfferState.status = null
        state.deleteOfferState.error = action.payload.data.message
      }
      )
      .addCase(rejectOffer.fulfilled, (state, action) => {
        if (action.payload.status === 404) {
          state.rejectOfferState.status = null
          state.rejectOfferState.error = action.payload.message
        } else {
          state.rejectOfferState.status = "succeeded"
          state.rejectOfferState.error = null
        }

      }
      )
      .addCase(rejectOffer.rejected, (state, action) => {
        state.rejectOfferState.status = null
        state.rejectOfferState.error = action.payload.data.message
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

// export const selectSendOfferState = (state) => state.offers.sendOfferState

export const selectDeleteOfferState = (state) => state.offers.deleteOfferState
export const selectRejectOfferState = (state) => state.offers.rejectOfferState

export const { resetDeleteOfferState, deleteOfferFromStore } = offersSlice.actions
export default offersSlice.reducer