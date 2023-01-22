import React, { Suspense, useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpinnerComponent from "./@core/components/spinner/Fallback-spinner"

// ** Router Import
import Router from "./router/Router"
// import toast from "react-hot-toast"
import { fetchUserData, selectUser, selectUserID } from "./redux/authentication"
import { getAllData } from "./pages/users/store"
import { fetchCandidatesData } from "./pages/candidates/store"
import { getOffersData } from "./pages/Offers/store"
import { SocketContext } from "./utility/context/Socket"

const App = () => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserID)
  const user = useSelector(selectUser)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    // load data when app is mounted
    if (userId) {
      socket?.emit("addSocket", user.id)
      dispatch(getAllData())
      dispatch(fetchCandidatesData(user.university_id))
      dispatch(getOffersData())
      dispatch(fetchUserData())
    }
  }, [dispatch, socket, userId, user.university_id])

  // useEffect(() => {
  //   socket?.emit("addSocket", userId)
  // }, [socket, userId])
  return (
    <Suspense fallback={<SpinnerComponent />}>
      <Router />
    </Suspense>
  )
}

export default App
