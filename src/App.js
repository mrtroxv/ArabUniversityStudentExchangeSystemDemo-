import React, { Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchAllOffers } from "./redux/project/offers"
import { fetchStudents } from "./redux/project/students"
import { fetchUniversities } from "./redux/project/universities"

// ** Router Import
import Router from "./router/Router"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // load data when app is mounted
    dispatch(fetchAllOffers())
    dispatch(fetchUniversities())
    dispatch(fetchStudents())
  }, [])
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
