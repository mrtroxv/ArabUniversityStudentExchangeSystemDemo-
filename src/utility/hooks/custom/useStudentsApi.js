import React from "react"
import { useSelector } from "react-redux"
import {
  selectAllStudents,
  selectIsLoadingStudents,
  selectStudentById
} from "../../../redux/project/students"

const useUniversityApi = () => {
  const isLoading = useSelector(selectIsLoadingStudents)
  const data = useSelector(selectAllStudents)
  const student = (id) => useSelector((state) => selectStudentById(state, id))
  return {
    isLoading,
    students: data,
    student
  }
}

export default useUniversityApi
