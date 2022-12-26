import React, { Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import SpinnerComponent from "./@core/components/spinner/Fallback-spinner"
import { fetchAllOffers } from "./redux/project/offers"
import { fetchStudents } from "./redux/project/students"
import { fetchUniversities } from "./redux/project/universities"
// import { Toast } from "react-hot-toast"

// ** Router Import
import Router from "./router/Router"
import toast from "react-hot-toast"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // load data when app is mounted
    const promises = Promise.all([
      dispatch(fetchAllOffers()),
      dispatch(fetchUniversities()),
      dispatch(fetchStudents())
    ])
    toast.promise(promises, {
      loading: "Loading Data...",
      success: "Data Loaded",
      error: "Error"
    })
  }, [])
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <Router />
    </Suspense>
  )
}

export default App
