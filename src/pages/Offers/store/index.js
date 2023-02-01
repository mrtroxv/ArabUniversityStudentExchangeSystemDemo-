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
export const getStudentByOfferId = createAsyncThunk(
  "appOffers/getStudentById",
  async (id) => {
    const response = await axios.get(
      "http://localhost:3500/offer/get-student-data",
      {
        params: {
          offerId: id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)
export const getUniversityReport = createAsyncThunk(
  "appOffers/getUniversityReport",
  async (id) => {
    const response = await axios.get(
      "http://localhost:3500/offer/get-university-report",
      {
        params: {
          requestId: id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)
export const getStudentReport = createAsyncThunk(
  "appOffers/getStudentReport",
  async (id) => {
    const response = await axios.get(
      "http://localhost:3500/offer/get-student-report",
      {
        params: {
          requestId: id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)
export const getRequestData = createAsyncThunk(
  "appOffers/getRequestData",
  async (data, { dispatch }) => {
    const response = await axios.get(
      "http://localhost:3500/offer/get-request-data",
      {
        params: {
          offerId: data.id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    if (response.data?.id && data.status >= 7) {
      await dispatch(getUniversityReport(response.data?.id))
      await dispatch(getStudentReport(response.data?.id))
    }
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
      if (response.data.University_id_des && response.data.status > 0) {
        await dispatch(getUniversityById(response.data.University_id_des))
      }
      if (response.data.status > 2) {
        await dispatch(
          getRequestData({
            id,
            status: response.data.status
          })
        )
        await dispatch(getStudentByOfferId(id))
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
  async (offerData, { dispatch }) => {
    try {
      await axios.post(`http://localhost:3500/offer/send-offer`, offerData, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      await dispatch(getOffer(offerData.offer_id))
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
export const rejectSubmission = createAsyncThunk(
  "offers/rejectSubmission",
  async (offer_id, { dispatch }) => {
    try {
      await axios.post(
        `http://localhost:3500/offer/reject-submission`,
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

export const removeStudent = createAsyncThunk(
  "offers/removeStudent",
  async (offerIdAndStudentId, { dispatch }) => {
    try {
      await axios.post(
        "http://localhost:3500/offer/remove-student",
        offerIdAndStudentId,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffer(offerIdAndStudentId.offer_id))
    } catch (error) {}
  }
)

export const addStudent = createAsyncThunk(
  "offers/addStudent",
  async (offerIdAndStudentId, { dispatch }) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/offer/add-student",
        offerIdAndStudentId,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffer(offerIdAndStudentId.offer_id))
      return response.data
    } catch (error) {}
  }
)

export const submitRequest = createAsyncThunk(
  "appOffers/submitRequest",
  async (requestData, { dispatch }) => {
    try {
      await axios.put(
        "http://localhost:3500/offer/submit-request",
        requestData,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffer(requestData.offer_id))
      // you can dispatch any action here based on the response of the update request.
    } catch (error) {
      // handle the error
    }
  }
)
export const acceptRequest = createAsyncThunk(
  "appOffers/acceptRequest",
  async (requestData, { dispatch }) => {
    try {
      await axios.put(
        "http://localhost:3500/offer/accept-request",
        requestData,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffer(requestData.offer_id))
      // you can dispatch any action here based on the response of the update request.
    } catch (error) {
      // handle the error
    }
  }
)
export const updateRequest = createAsyncThunk(
  "appOffers/updateRequest",
  async (requestData, { dispatch }) => {
    try {
      await axios.put(
        "http://localhost:3500/offer/update-request",
        requestData,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getOffer(requestData.offer_id))
      // you can dispatch any action here based on the response of the update request.
    } catch (error) {
      // handle the error
    }
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
      student: null,
      request: null,
      universityReport: null,
      studentReport: null
    },
    isLoading: false
  },
  reducers: {
    flushSelectedOffer: (state) => {
      state.selectedOffer.university = null
      state.selectedOffer.student = null
      state.selectedOffer.offer = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOffersData.fulfilled, (state, action) => {
        state.allData.offers = action.payload
        state.selectedOffer.offer = null
        state.selectedOffer.university = null
        state.selectedOffer.student = null
        state.isLoading = false
      })
      .addCase(getOffersData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.selectedOffer.offer = action.payload
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
      .addCase(getStudentByOfferId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudentByOfferId.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.student = action.payload
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
      .addCase(rejectOffer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(rejectOffer.fulfilled, (state) => {
        state.isLoading = false
        state.selectedOffer.university = null
      })
      .addCase(getRequestData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRequestData.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.request = action.payload
      })
      .addCase(getUniversityReport.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUniversityReport.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.universityReport = action.payload || null
      })
      .addCase(getStudentReport.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudentReport.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOffer.studentReport = action.payload || null
      })
      .addCase(removeStudent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeStudent.fulfilled, (state) => {
        state.isLoading = false
        state.selectedOffer.student = null
        state.selectedOffer.request = null
      })
      .addCase(addStudent.pending, (state) => {
        state.isLoading = true
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

export const { flushSelectedOffer } = appOffersSlice.actions
export default appOffersSlice.reducer
