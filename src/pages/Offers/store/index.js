// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const getOffersData = createAsyncThunk(
  "appOffers/getAllData",
  async () => {
    const response = await axios.get("http://localhost:3500/offer/show_offer", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  }
)
export const getFinishedOffers = createAsyncThunk(
  "offers/get-finished",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/offer/get-finished",
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
export const getUniversityById = createAsyncThunk(
  "appOffers/getUniversityById",
  async (id) => {
    const response = await axios.get(
      "http://localhost:3500/offer/get-university-data",
      {
        params: {
          universityId: id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)
export const getOffer = createAsyncThunk(
  "appOffers/getOffer",
  async (id, { dispatch }) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/offer/get-offer`,
        {
          params: {
            id
          },
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      if (response.data.University_id_des) {
        await dispatch(getUniversityById(response.data.University_id_des))
      }
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const editOffer = createAsyncThunk(
  "offers/edit-offer",
  async (data, { dispatch }) => {
    try {
      await axios.patch("http://localhost:3500/offer/update_offer", data, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      await dispatch(getOffer(data.id))
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const sendOffer = createAsyncThunk(
  "offers/sendOffer",
  async (offerData) => {
    try {
      await axios.post(`http://localhost:3500/offer/send-offer`, offerData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      const offer = await axios.get(`http://localhost:3500/offer/get-offer`, {
        params: {
          id: offerData.offer_id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      const university = await axios.get(
        "http://localhost:3500/offer/get-university-data",
        {
          params: {
            universityId: offerData.university_id_des
          },
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      return {
        offer: offer.data,
        university: university.data
      }
    } catch (error) {}
  }
)
export const deleteOffer = createAsyncThunk(
  "offers/deleteOffer",
  async (offer_id, { dispatch }) => {
    try {
      await axios.post(
        `http://localhost:3500/offer/delete-offer`,
        { offer_id },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffersData())
    } catch (error) {}
  }
)
export const duplicateOffer = createAsyncThunk(
  "offers/duplicate-offer",
  async (body, { dispatch }) => {
    try {
      await axios.post(
        `http://localhost:3500/offer/duplicate`,
        { body },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffersData())
    } catch (error) {}
  }
)
export const rejectOffer = createAsyncThunk(
  "offers/rejectOffer",
  async (offer_id, { dispatch }) => {
    try {
      await axios.post(
        `http://localhost:3500/offer/reject-offer`,
        { offer_id },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffersData())
    } catch (error) {}
  }
)
export const acceptOffer = createAsyncThunk(
  "offers/acceptOffer",
  async (offer_id, { dispatch }) => {
    try {
      await axios.post(
        `http://localhost:3500/offer/accept-offer`,
        { offer_id },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffer(offer_id))
    } catch (error) {}
  }
)

export const appOffersSlice = createSlice({
  name: "appOffers",
  initialState: {
    allData: {
      offers: [],
      finishedOffers: []
    },
    selectedOffer: {
      offer: null,
      university: null,
      student: null
    },
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOffersData.fulfilled, (state, action) => {
        state.allData.offers = action.payload
        state.selectedOffer.offer = null
        state.selectedOffer.university = null
        state.isLoading = false
      })
      .addCase(getOffersData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.selectedOffer.offer = action.payload
        // state.selectedOffer.university = null
        state.isLoading = false
      })
      .addCase(getOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUniversityById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUniversityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.university = action.payload
      })
      .addCase(getFinishedOffers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFinishedOffers.fulfilled, (state, action) => {
        state.isLoading = false
        state.allData.finishedOffers = action.payload
      })
      .addCase(editOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editOffer.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.offer = action.payload
      })
      .addCase(sendOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendOffer.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.offer = action.payload.offer
        state.selectedOffer.university = action.payload.university
      })
      .addCase(rejectOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(rejectOffer.fulfilled, (state) => {
        state.isLoading = false
        state.selectedOffer.university = null
      })
  }
})

export const selectCreatedOffers = (state, userId) =>
  state.appOffers.allData.offers?.filter(
    (offer) => offer.university_id_src === userId && offer.status === 0
  )
export const selectSentOffers = (state, userId) =>
  state.appOffers.allData.offers?.filter(
    (offer) => offer.university_id_src === userId && offer.status >= 1
  )
export const selectObtainedOffers = (state, userId) => {
  return state.appOffers.allData.offers?.filter((offer) => {
    return offer.University_id_des === userId && offer.status >= 1
  })
}

export default appOffersSlice.reducer
