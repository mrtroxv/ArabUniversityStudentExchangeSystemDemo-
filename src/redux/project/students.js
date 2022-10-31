import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const STUDENTS_URL = 'http://localhost:3500/student/show_student'
const initialState = {
    students: [],
    status: 'idle',
    error: null
}

export const fetchStudents = createAsyncThunk('students/getStudents', async () => {
    try {
        const res = await axios.get(STUDENTS_URL, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('accessToken'))
            }
        })
        return res.data
    } catch (error) {
        console.log(1)
    }
})

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.students = action.payload
            state.status = 'succeeded'
        })
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default studentsSlice.reducer

export const selectAllStudents = (state) => state.students.students

export const selectStudentById = (state, id) => {
    return state.students.students.find((s) => {
        return s.id === +id
    })
}
