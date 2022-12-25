import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const UNIVERSITIES_URL = "http://localhost:3500/admin/universities"
const initialState = {
  universities: [],
  status: "idle",
  error: "",
  isLoading: false
}

export const fetchUniversities = createAsyncThunk(
  "universities/getUniversities",
  async () => {
    try {
      const res = await axios.get(UNIVERSITIES_URL, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken"))
        }
      })
      return res.data
    } catch (error) {
      console.log(1)
    }
  }
)

const universitiesSlice = createSlice({
  name: "universities",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.universities = action.payload
        state.status = "succeeded"
        state.isLoading = false
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
        state.isLoading = false
      })
      .addCase(fetchUniversities.pending, (state) => {
        state.isLoading = true
      })
  }
})

export default universitiesSlice.reducer

export const selectAllUniversities = (state) => {
  const user_university_id = state.auth.userData.university_id
  const universities = state.universities.universities.filter(
    (university) => university.ID !== user_university_id
  )
  return universities
}

export const selectUniversityById = (state, id) => {
  return state.universities.universities.find((u) => {
    return u.ID === +id
  })
}

export const selectIsLoadingUniversities = (state) => state.universities.isLoading
