import React, { Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchOffers } from "./redux/project/offers"

// ** Router Import
import Router from "./router/Router"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // load data when app is mounted
    dispatch(fetchOffers())
  }, [])
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  )
}

export default App
