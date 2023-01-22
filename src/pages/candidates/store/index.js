// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const getRequestsData = createAsyncThunk(
  "candidates/request",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/student/request-data`,
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
    } catch (error) {
      console.log(error)
    }
  }
)
export const fetchCandidatesData = createAsyncThunk(
  "students/getCandidates",
  async (id, { dispatch }) => {
    try {
      const response = await axios.get(
        "http://localhost:3500/student/get-all-data",
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      await dispatch(getRequestsData(id))
      return response.data
    } catch (error) {}
  }
)

export const getData = createAsyncThunk("appUsers/getData", async (params) => {
  const response = await axios.get("/api/users/list/data", params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getCandidate = createAsyncThunk(
  "candidates/getCandidate",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/student/get-student`,
        {
          params: {
            studentId: id
          },
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

export const addCandidate = createAsyncThunk(
  "candidates/addCandidate",
  async (data) => {
    await axios.post(
      "http://localhost:3500/student/insert_student",
      {
        ...data
      },
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
  }
)

export const updateCandidate = createAsyncThunk(
  "candidates/editCandidate",
  async (data) => {
    try {
      await axios.patch(`http://localhost:3500/student/update_student`, data, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      const response = await axios.get(
        `http://localhost:3500/student/get-student`,
        {
          params: {
            studentId: data.ID
          },
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

export const editCandidate = createAsyncThunk(
  "students/editCandidate",
  async (data) => {
    await axios.post(`http://localhost:3500/student/edit-student`, data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken")),
        "Content-Type": "multipart/form-data"
      }
    })
    const response = await axios.get(
      `http://localhost:3500/student/get-students`,
      {
        params: {
          universityId: data.ID
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
  }
)
export const addUser = createAsyncThunk(
  "appUsers/addUser",
  async (user, { dispatch, getState }) => {
    await axios.post("/apps/users/add-user", user)
    await dispatch(getData(getState().users.params))
    await dispatch(getAllData())
    return user
  }
)

export const deleteUser = createAsyncThunk(
  "appUsers/deleteUser",
  async (id, { dispatch, getState }) => {
    await axios.delete("/apps/users/delete", { id })
    await dispatch(getData(getState().users.params))
    await dispatch(getAllData())
    return id
  }
)

export const appUsersSlice = createSlice({
  name: "candidates",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: {
      offer: {},
      student: {}
    },
    requestsData: [],
    isLoading: false
  },
  reducers: {
    deleteRequest(state, action) {
      state.requestsData = state.requestsData.filter(
        (item) =>
          item.student_id !== action.payload?.student_id ||
          item.offer_id !== action.payload?.offer_id
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesData.fulfilled, (state, action) => {
        state.allData = action.payload || []
        state.isLoading = false
      })
      .addCase(fetchCandidatesData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        // state.params = action.payload.params
        // state.total = action.payload.totalPages
        state.isLoading = false
      })
      .addCase(getCandidate.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.isLoading = false
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.isLoading = false
      })
      .addCase(addCandidate.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(updateCandidate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRequestsData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRequestsData.fulfilled, (state, action) => {
        state.requestsData = action.payload
        state.isLoading = false
      })
  }
})

export const { deleteRequest } = appUsersSlice.actions

export default appUsersSlice.reducer
