import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpinnerComponent from "./@core/components/spinner/Fallback-spinner"

// ** Router Import
import Router from "./router/Router"
import toast from "react-hot-toast"
import { fetchUserData, selectUser, selectUserID } from "./redux/authentication"
import { getAllData } from "./pages/users/store"
import { fetchCandidatesData } from "./pages/candidates/store"
import { getOffersData } from "./pages/Offers/store"

const App = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserID)
  const user = useSelector(selectUser)

  useEffect(() => {
    // load data when app is mounted
    if (userId) {
      const promises = Promise.all([
        dispatch(getAllData()),
        dispatch(fetchCandidatesData(user.university_id)),
        dispatch(getOffersData()),
        dispatch(fetchUserData())
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
