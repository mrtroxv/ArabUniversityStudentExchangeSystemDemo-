// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"

export const fetchCandidatesData = createAsyncThunk(
  "students/getAllData",
  async () => {
    const response = await axios.get(
      "http://localhost:3500/student/get-all-data",
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      }
    )
    return response.data
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
  "students/getStudent",
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
      console.log(response)

      return response.data
    } catch (error) {
      console.log(error)
    }
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
    selectedUser: null,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidatesData.fulfilled, (state, action) => {
        state.allData = action.payload
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
  }
})

export default appUsersSlice.reducer
