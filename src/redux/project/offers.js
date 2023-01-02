import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
// eslint-disable-next-line
import {
  ACCEPT_OFFER_URL,
  ACTIVE_OFFERS_URL,
  ADD_STUDENT_URL,
  CREATE_OFFER_URL,
  DELETE_OFFER_URL,
  DUPLICATE_OFFER_URL,
  ENDED_OFFERS_URL,
  // headersApi,
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
  }
}

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async (offerData) => {
    try {
      const response = await axios.post(CREATE_OFFER_URL, offerData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })

      return response.data
    } catch (err) {
      console.log("eee", err)
    }
  }
)

// getAllOffers
export const fetchAllOffers = createAsyncThunk(
  "offers/show_offer",
  async () => {
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
  }
)

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
      await axios.post(SEND_OFFER_URL, offerData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      const response = await axios.get(OFFERS_URL, {
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
export const dupliateOffer = createAsyncThunk(
  "offers/duplicate-offer",
  async (body) => {
    try {
      await axios.post(
        DUPLICATE_OFFER_URL,
        { body },
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
      await axios.post(
        REJECT_OFFER_URL,
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

export const acceptOffer = createAsyncThunk(
  "offers/acceptOffer",
  async (offer_id) => {
    try {
      await axios.post(
        ACCEPT_OFFER_URL,
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

export const addStudent = createAsyncThunk(
  "offers/addStudent",
  async (offerIdAndStudentId) => {
    try {
      await axios.post(ADD_STUDENT_URL, offerIdAndStudentId, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      const response = await axios.get(OFFERS_URL, {
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
    resetCreateOfferState: (state) => {
      state.createOfferState = {
        status: null,
        error: null
      }
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
        if (action.payload.status === 400) {
          state.createOfferState.status = null
          state.createOfferState.error = action.payload.message
        } else {
          state.createOfferState.status = "succeeded"
          state.createOfferState.error = null
        }
      })
      .addCase(createOffer.rejected, (state) => {
        state.createOfferState.status = null
        state.createOfferState.error = action.payload.data.message
      })
      .addCase(sendOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.isLoading = false
        state.offers = action.payload
      })
      .addCase(sendOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.isLoading = false
        state.offers = action.payload
      })
      .addCase(deleteOffer.pending, (state) => {
        state.isLoading = false
      })
      .addCase(rejectOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.isLoading = false
        state.offers = action.payload
      })
      .addCase(rejectOffer.pending, (state) => {
        state.isLoading = false
      })
      .addCase(acceptOffer.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.isLoading = false
        state.offers = action.payload
      })
      .addCase(acceptOffer.pending, (state) => {
        state.isLoading = false
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.isLoading = false
        state.offers = action.payload
      })
      .addCase(addStudent.pending, (state) => {
        state.isLoading = false
      })
      .addCase(dupliateOffer.fulfilled, (state, action) => {
        state.isLoading = false
        state.offers = action.payload
      })
      .addCase(dupliateOffer.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const selectAllOffers = (state) => state.offers?.offers
export const selectCreatedOffers = (state, userId) =>
  state.offers.offers?.filter(
    (offer) => offer.university_id_src === userId && offer.status === 0
  )
export const selectSentOffers = (state, userId) =>
  state.offers.offers?.filter(
    (offer) => offer.university_id_src === userId && offer.status >= 1
  )
export const selectObtainedOffers = (state, userId) => {
  return state.offers.offers?.filter((offer) => {
    return offer.University_id_des === userId && offer.status >= 1
  })
}

export const selectOfferById = (state, id) => {
  const offer = state.offers.offers?.find((offer) => offer.id === +id)
  return offer
}

export const selectCreateOfferState = (state) => state.offers.createOfferState
export const selectIsLoadingOffers = (state) => state.offers.isLoading

export const { resetCreateOfferState } = offersSlice.actions
export default offersSlice.reducer
