import React from "react"
import { useSelector } from "react-redux"
import {
  selectAllUniversities,
  selectIsLoadingUniversities,
  selectUniversityById
} from "../../../redux/project/universities"

const useUniversityApi = () => {
  const isLoading = useSelector(selectIsLoadingUniversities)
  const data = useSelector(selectAllUniversities)
  const university = (id) =>
    useSelector((state) => selectUniversityById(state, id))
  return {
    isLoading,
    universities: data,
    university
  }
}

export default useUniversityApi
