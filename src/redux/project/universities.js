import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const UNIVERSITIES_URL = "http://localhost:3500/admin/universities"
const initialState = {
    universities: [],
    status: "idle",
    error: ""
}

export const fetchUniversities = createAsyncThunk("students/getStudents", async () => {
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
})

const universitiesSlice = createSlice({
    name: "universities",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUniversities.fulfilled, (state, action) => {
            state.universities = action.payload
            state.status = "succeeded"
        })
        builder.addCase(fetchUniversities.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export default universitiesSlice.reducer

export const selectAllUniversities = (state) => state.universities.universities

export const selectUniversityById = (state, id) => {
    return state.universities.universities.find((u) => {
        return u.id === +id
    })
}
