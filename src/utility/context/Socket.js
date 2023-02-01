import moment from "moment"
import React, { createContext, useEffect, useState } from "react"
import { UserMinus, X } from "react-feather"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"
import Avatar from "../../@core/components/avatar"
import {
  addNotification,
  createNotification
} from "../../redux/project/notification"

const SocketContext = createContext()

const ToastContent = ({ t, title, body, icon, color }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color={color} icon={icon} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{title}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>{body}</span>
      </div>
    </div>
  )
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNotificationClick = (data) => {
    navigate(`/view-offers/${data}`)
  }

  useEffect(() => {
    const socket = io("http://localhost:5000")
    setSocket(socket)

    socket?.on("send-notification", (data) => {
      toast.success("An offer has been updated")
      dispatch(
        addNotification(
          createNotification(
            data.name,
            {
              subtitle: data.message,
              onClick: () => handleNotificationClick(data.link),
              icon: <UserMinus size={12} />,
              date: moment(data.meta)
            },
            data.type
          )
        )
      )
    })

    return () => {
      socket.off("send-notification")
      socket.off("update-data")
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider }
