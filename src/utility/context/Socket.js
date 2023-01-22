import React, { createContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"
import Avatar from "../../@core/components/avatar"
import { deleteRequest } from "../../pages/candidates/store"
import {
  flushSelectedOffer,
  getOffer,
  getOffersData
} from "../../pages/Offers/store"
import {
  addNotification,
  createSuccessNotification,
  createWarningNotification
} from "../../redux/project/notification"
// import { useLang } from "../hooks/custom/useLang"
// import { getUniversityName } from "../Utils"

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [lang] = useLang()
  // const notifications = useSelector((state) => state.notifications)
  useEffect(() => {
    const socket = io("http://localhost:3200")
    setSocket(socket)
    return () => socket.close()
  }, [])

  socket?.on("offersUpdated", (data) => {
    dispatch(getOffersData())
    toast.success("Recieved new offer")
    dispatch(
      addNotification(
        createSuccessNotification("Recieved new offer", {
          title: "Recieved new offer",
          subtitle: "Recieved new offer",
          color: "success",
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })

  socket?.on("offerAccepted", (data) => {
    // dispatch(getOffersData())
    toast.success("An offer you sent has been accepted")
    dispatch(
      addNotification(
        createSuccessNotification("New offer accepted", {
          // title: getUniversityName(data, lang),
          subtitle: "An offer you sent has been accepted",
          color: "success",
          avatar: <Avatar img={data.logo} />
        })
      )
    )
  })

  socket?.on("studentAdded", (data) => {
    dispatch(getOffer(data.id))
    toast.success("A new student has been added")
    dispatch(
      addNotification(
        createSuccessNotification("New student added", {
          subtitle: "A new student has been added",
          color: "success",
          avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })

  socket?.on("update_offer", (data) => {
    toast.success("An offer has been updated")
    dispatch(
      addNotification(
        createSuccessNotification("Offer updated", {
          subtitle: "An offer has been updated",
          color: "success",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })

  socket?.on("remove-student", (data) => {
    dispatch(deleteRequest(data.id))
    dispatch(flushSelectedOffer())
    dispatch(getOffer(data.id))
    toast.success("An offer has been updated")
    dispatch(
      addNotification(
        createWarningNotification("Offer updated", {
          subtitle: "Student has been removed from offer",
          color: "warning",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })

  socket?.on("reject-offer", (data) => {
    dispatch(getOffer(data.id))
    toast.success("An offer has been updated")
    dispatch(
      addNotification(
        createWarningNotification("Offer Rejected", {
          subtitle: `Offer #${data.id} has been rejected`,
          color: "warning",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => {}
        })
      )
    )
  })
  socket?.on("submit-request", (data) => {
    dispatch(getOffer(data.id))
    toast.success("A new student has been submitted")
    dispatch(
      addNotification(
        createWarningNotification("Student Submission", {
          subtitle: `Offer #${data.id} is pending approval`,
          color: "warning",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => {}
        })
      )
    )
  })

  socket?.on("update-request", (data) => {
    dispatch(getOffer(data.id))
    dispatch(
      addNotification(
        createSuccessNotification("Offer updated", {
          subtitle: "An offer has been updated",
          color: "success",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })

  socket?.on("accept-request", (data) => {
    dispatch(getOffer(data.id))
    toast.success("A request got Accepted")
    dispatch(
      addNotification(
        createSuccessNotification("Request got Accepted", {
          subtitle: "A request has been accepted",
          color: "success",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })
  socket?.on("send-offer", (data) => {
    dispatch(getOffer(data.id))
    toast.success("Offer Recieved")
    dispatch(
      addNotification(
        createSuccessNotification("Offer Recieved", {
          subtitle: "An offer has been recieved",
          color: "success",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })
  socket?.on("accept-offer", (data) => {
    dispatch(getOffer(data.id))
    toast.success("Offer Recieved")
    dispatch(
      addNotification(
        createSuccessNotification("Offer Recieved", {
          subtitle: "An offer has been recieved",
          color: "success",
          // avatar: <Avatar img={data.logo} />,
          onClick: () => navigate(`/view-offers/${data.id}`)
        })
      )
    )
  })

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
