import React from "react"
import { useSelector } from "react-redux"
import {
  selectAllUniversities,
  selectIsLoadingUniversities
} from "../../../redux/project/universities"

const useUniversityApi = () => {
  const isLoading = useSelector(selectIsLoadingUniversities)
  const data = useSelector(selectAllUniversities)
  return {
    isLoading,
    universities: data
  }
}

export default useUniversityApi
