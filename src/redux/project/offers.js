import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
// eslint-disable-next-line
import {
  ACCEPT_OFFER_URL,
  ACTIVE_OFFERS_URL,
  ADD_STUDENT_URL,
  CREATE_OFFER_URL,
  DELETE_OFFER_URL,
  ENDED_OFFERS_URL,
  OBTAINED_OFFER_URL,
  OFFERS_URL,
  OWN_OFFERS_URL,
  REJECT_OFFER_URL,
  SEND_OFFER_URL
} from "./constants"

const initialState = {
  offers: [],
  status: "idle",
  error: null,
  isLoading: false,
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
  },
  acceptOfferState: {
    status: null,
    error: null
  },
  addStudentState: {
    status: null,
    error: null
  }
}

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async (offerData) => {
    let response
    try {
      response = await axios.post(CREATE_OFFER_URL, offerData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (err) {}
  }
)

// getAllOffers
export const fetchAllOffers = createAsyncThunk("offers/getOffers", async () => {
  try {
    const response = await axios.get(OFFERS_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {}
})

export const fetchOwnOffer = createAsyncThunk(
  "offers/getOwnOffers",
  async () => {
    try {
      const response = await axios.get(OWN_OFFERS_URL, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
  }
)

export const fetchObtainedOffer = createAsyncThunk(
  "offers/getObtainedOffers",
  async () => {
    try {
      const response = await axios.get(OBTAINED_OFFER_URL, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
  }
)

export const fetchActiveOffers = createAsyncThunk(
  "offers/getActiveOffers",
  async () => {
    try {
      const response = await axios.get(ACTIVE_OFFERS_URL, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
  }
)

export const fetchEndedOffers = createAsyncThunk(
  "offers/getEndedOffers",
  async () => {
    try {
      const response = await axios.get(ENDED_OFFERS_URL, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
  }
)

export const sendOffer = createAsyncThunk(
  "offers/sendOffer",
  async (offerData) => {
    try {
      const response = await axios.post(SEND_OFFER_URL, offerData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
  }
)
export const deleteOffer = createAsyncThunk(
  "offers/deleteOffer",
  async (offer_id) => {
    try {
      await axios.post(
        DELETE_OFFER_URL,
        { offer_id },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      const response = await axios.get(OFFERS_URL, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
  }
)
export const rejectOffer = createAsyncThunk(
  "offers/rejectOffer",
  async (offer_id) => {
    try {
      const response = await axios.post(
        REJECT_OFFER_URL,
        { offer_id },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      return response.data
    } catch (error) {}
  }
)

export const acceptOffer = createAsyncThunk(
  "offers/acceptOffer",
  async (offer_id) => {
    try {
      const response = await axios.post(
        ACCEPT_OFFER_URL,
        { offer_id },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      return response.data
    } catch (error) {}
  }
)

export const addStudent = createAsyncThunk(
  "offers/addStudent",
  async (offerIdAndStudentId) => {
    try {
      const response = await axios.post(ADD_STUDENT_URL, offerIdAndStudentId, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {}
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
    resetAddStudentState: (state) => {
      state.addStudentState.status = null
      state.addStudentState.error = null
    },
    resetAcceptOfferState: (state) => {
      state.acceptOfferState.status = null
      state.acceptOfferState.error = null
    },
    resetRejectOfferState: (state) => {
      state.rejectOfferState.status = null
      state.rejectOfferState.error = null
    },
    resetSendOfferState: (state) => {
      state.sendOfferState.status = null
      state.sendOfferState.error = null
    },
    resetCreateOfferState: (state) => {
      state.createOfferState.status = null
      state.createOfferState.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
        state.isLoading = false
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
        state.isLoading = false
      })
      .addCase(fetchAllOffers.pending, (state) => {
        state.isLoading = true
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
        console.log(action.payload)

        if (action.payload.status === 400) {
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
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.offers = action.payload
        state.isLoading = false
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.deleteOfferState.status = null
        state.deleteOfferState.error = action.payload.data.message
      })
      .addCase(rejectOffer.fulfilled, (state, action) => {
        if (action.payload.status === 404) {
          state.rejectOfferState.status = null
          state.rejectOfferState.error = action.payload.message
        } else {
          state.rejectOfferState.status = "succeeded"
          state.rejectOfferState.error = null
        }
      })
      .addCase(rejectOffer.rejected, (state, action) => {
        state.rejectOfferState.status = null
        state.rejectOfferState.error = action.payload.data.message
      })
      .addCase(acceptOffer.fulfilled, (state, action) => {
        if (action.payload.status === 404) {
          state.acceptOfferState.status = null
          state.acceptOfferState.error = action.payload.message
        } else {
          state.acceptOfferState.status = "succeeded"
          state.acceptOfferState.error = null
        }
      })
      .addCase(acceptOffer.rejected, (state, action) => {
        state.acceptOfferState.status = null
        state.acceptOfferState.error = action.payload.data.message
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        if (action.payload.status === 404) {
          state.addStudentState.status = null
          state.addStudentState.error = action.payload.message
        } else {
          state.addStudentState.status = "succeeded"
          state.addStudentState.error = null
        }
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.addStudentState.status = null
        state.addStudentState.error = action.payload.data.message
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
    (offer) => offer.university_id_src === userId && offer.status >= 1
  )
export const selectObtainedOffers = (state, userId) =>
  state.offers.offers.filter(
    (offer) =>
      offer.university_id_des === userId &&
      (offer.status === 1 || offer.status === 2)
  )

export const selectOfferById = (state, id) => {
  const offer = state.offers.offers.find((offer) => offer.id === +id)
  return offer
}

export const selectCreateOfferState = (state) => state.offers.createOfferState
export const selectSendOfferState = (state) => state.offers.sendOfferState
export const selectDeleteOfferState = (state) => state.offers.deleteOfferState
export const selectRejectOfferState = (state) => state.offers.rejectOfferState
export const selectAcceptOfferState = (state) => state.offers.acceptOfferState
export const selectAddStudentState = (state) => state.offers.addStudentState
export const selectIsLoadingOffers = (state) => state.offers.isLoading

export const {
  resetDeleteOfferState,
  resetAddStudentState,
  resetAcceptOfferState,
  resetCreateOfferState,
  resetSendOfferState
} = offersSlice.actions
export default offersSlice.reducer
