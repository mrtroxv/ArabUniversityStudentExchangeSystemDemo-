import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpinnerComponent from "./@core/components/spinner/Fallback-spinner"
import { fetchAllOffers } from "./redux/project/offers"
import { fetchStudents } from "./redux/project/students"
import { fetchUniversities } from "./redux/project/universities"
// import { Toast } from "react-hot-toast"

// ** Router Import
import Router from "./router/Router"
import toast from "react-hot-toast"
import { selectUserID } from "./redux/authentication"
import { getAllData } from "./pages/users/store"
import { getOffersData } from "./pages/Offers/store"
import { fetchCandidatesData } from "./pages/candidates/store"

const App = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserID)
  useEffect(() => {
    // load data when app is mounted
    if (userId) {
      const promises = Promise.all([
        dispatch(fetchAllOffers()),
        dispatch(fetchUniversities()),
        dispatch(fetchStudents()),
        dispatch(getAllData()),
        dispatch(fetchCandidatesData()),
        dispatch(getOffersData())
      ])
      toast.promise(promises, {
        loading: "Loading Data...",
        success: "Data Loaded",
        error: "Error"
      })
    }
  }, [dispatch])
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <Router />
    </Suspense>
  )
}

export default App
