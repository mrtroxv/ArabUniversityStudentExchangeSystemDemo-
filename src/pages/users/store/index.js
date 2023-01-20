// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// ** Axios Imports
import axios from "axios"
import { GET_USER } from "./constants"

export const getAllData = createAsyncThunk("appUsers/getAllData", async () => {
  const response = await axios.get("http://localhost:3500/admin/get-all-data", {
    headers: {
      authorization: JSON.parse(localStorage.getItem("accessToken"))
    }
  })
  return response.data
})

export const getData = createAsyncThunk("appUsers/getData", async (params) => {
  const response = await axios.get("/api/users/list/data", params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const suspendUser = createAsyncThunk(
  "appUsers/suspendUser",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(`http://localhost:3500/admin/suspend-add-user`, data, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken")),
          "Content-Type": "multipart/form-data"
        },
        file: data.avatar
      })
      const response = await axios.get(`http://localhost:3500/admin/get-user`, {
        params: {
          universityId: data.university_id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error.message)
    }
  }
)
export const reactivateAccount = createAsyncThunk(
  "appUsers/reactivateAccount",
  async (data, { rejectWithValue }) => {
    try {
      await axios.post(
        `http://localhost:3500/admin/reactivate-user`,
        {
          userId: data.account_id,
          id: data.id,
          university_id: data.university_id
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      const response = await axios.get(`http://localhost:3500/admin/get-user`, {
        params: {
          universityId: data.university_id
        },
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return response.data
    } catch (error) {
      // console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const getUser = createAsyncThunk("appUsers/getUser", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3500/admin/get-user`, {
      params: {
        universityId: id
      },
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const editUser = createAsyncThunk("appUsers/editUser", async (data) => {
  try {
    await axios.post(`http://localhost:3500/account/edit-user`, data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken")),
        "Content-Type": "multipart/form-data"
      },
      file: data.avatar
    })
    const response = await axios.get(`http://localhost:3500/admin/get-user`, {
      params: {
        universityId: data.ID
      },
      headers: {
        authorization: JSON.parse(localStorage.getItem("accessToken"))
      }
    })
    return response.data
  } catch (error) {}
})

export const getUsersForUniversity = createAsyncThunk(
  "appUsers/getUsersForUniversity",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/admin/get-university-users`,
        {
          params: {
            universityId: id
          },
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      console.log(response.data)
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
  name: "appUsers",
  initialState: {
    data: [],
    params: {},
    allData: {
      activeUsers: [],
      suspendedUsers: []
    },
    selectedUser: null,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
        state.isLoading = false
      })
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.isLoading = false
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsersForUniversity.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(getUsersForUniversity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        reactivateAccount.fulfilled,
        suspendUser.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.selectedUser = action.payload
        }
      )
      .addCase(reactivateAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedUser = action.payload
      })
  }
})
export const selectUniversity = (state, id) => {
  return (
    state.users.allData?.activeUsers?.find((user) => user?.ID === id) ||
    state.users.allData?.suspendedUsers?.find((user) => user?.ID === id)
  )
}

export default appUsersSlice.reducer
