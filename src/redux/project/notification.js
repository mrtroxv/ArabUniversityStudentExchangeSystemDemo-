import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import moment from "moment"
import { AlertTriangle, Check, X } from "react-feather"
import { Link } from "react-router-dom"

const defaultOptions = {
  avatarIcon: <X size={14} />,
  color: "light-info",
  subtitle: "",
  onClick: null,
  meta: moment().format("DD MMM, YYYY"),
  title: (
    <p className="media-heading">
      <span className="fw-bolder">{name}</span>
    </p>
  )
}

export function createNotification(name, data, type) {
  let options = defaultOptions

  switch (type) {
    case "success":
      options = {
        avatarIcon: data?.avatar || <Check size={14} />,
        color: data?.color || "light-success",
        subtitle: `${data?.subtitle}`,
        onClick: data?.onClick,
        meta: moment(data?.date).format("DD MMM, YYYY"),
        title: (
          <p className="media-heading">
            <span className="fw-bolder">{name}</span>
          </p>
        )
      }
      break
    case "warning":
      options = {
        avatarIcon: data?.avatar || <AlertTriangle size={14} />,
        color: data?.color || "light-warning",
        subtitle: `${data?.subtitle}`,
        onClick: data?.onClick,
        meta: moment(data?.date).format("DD MMM, YYYY"),
        title: (
          <p className="media-heading">
            <span className="fw-bolder">{name}</span>
          </p>
        )
      }
      break
    case "danger":
      options = {
        avatarIcon: data?.avatar || <X size={14} />,
        color: data?.color || "light-danger",
        subtitle: `${data?.subtitle}`,
        onClick: data?.onClick,
        meta: moment(data?.date).format("DD MMM, YYYY"),
        title: (
          <p className="media-heading">
            <span className="fw-bolder">{name}</span>
          </p>
        )
      }
      break
    case "info":
    default:
      options = {
        avatarIcon: data?.avatar || <X size={14} />,
        color: data?.color || "light-info",
        subtitle: `${data?.subtitle}`,
        onClick: data?.onClick,
        meta: moment(data?.date).format("DD MMM, YYYY"),
        title: (
          <p className="media-heading">
            <span className="fw-bolder">{name}</span>
          </p>
        )
      }
  }

  return options
}

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3500/notifications/get-notifications",
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      return response.data
    } catch (error) {}
  }
)
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    notificationsCount: 0,
    notificationsUnread: 0,
    notificationsRead: 0,
    isLoading: false
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
    addNotification: (state, action) => {
      state.notifications = state.notifications.concat(action.payload)
      state.notificationsCount = state.notifications.length
      state.notificationsUnread = state.notificationsUnread + 1
    },
    removeNotification: (state, action) => {
      state.notifications = state.filter(
        (notification) => notification.id !== action.payload
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload?.map((notification) => {
          return createNotification(
            notification.title,
            {
              subtitle: notification.body,
              color: notification.type
            },
            notification.type
          )
        })
        state.notificationsCount = action.payload?.length
        state.notificationsUnread = action.payload?.length
        state.notificationsRead = 0
        state.isLoading = false
      })
      .addCase(getNotifications.rejected, (state) => {
        state.notifications = []
        state.notificationsCount = 0
        state.notificationsUnread = 0
        state.notificationsRead = 0
        state.isLoading = false
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const { setNotifications, addNotification, removeNotification } =
  notificationsSlice.actions

export default notificationsSlice.reducer
