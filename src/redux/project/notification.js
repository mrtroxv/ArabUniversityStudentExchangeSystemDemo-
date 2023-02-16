import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import moment from "moment"
import { AlertTriangle, Check, File, X } from "react-feather"

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
        id: data?.id,
        avatarIcon: data?.avatar || <Check size={14} />,
        color: data?.color || "light-success",
        subtitle: `${data?.subtitle}`,
        link: data?.link,
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
        id: data?.id,
        avatarIcon: data?.avatar || <AlertTriangle size={14} />,
        color: data?.color || "light-warning",
        subtitle: `${data?.subtitle}`,
        link: data?.link,
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
        id: data?.id,
        avatarIcon: data?.avatar || <X size={14} />,
        color: data?.color || "light-danger",
        subtitle: `${data?.subtitle}`,
        link: data?.link,
        meta: moment(data?.date).format("DD MMM, YYYY"),
        title: (
          <p className="media-heading">
            <span className="fw-bolder">{name}</span>
          </p>
        )
      }
      break
    case "info":
      options = {
        id: data?.id,
        avatarIcon: data?.avatar || <File size={14} />,
        color: data?.color || "light-info",
        subtitle: `${data?.subtitle}`,
        link: data?.link,
        meta: moment(data?.date).format("DD MMM, YYYY"),
        title: (
          <p className="media-heading">
            <span className="fw-bolder">{name}</span>
          </p>
        )
      }
      break
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

export const removeNotification = createAsyncThunk(
  "notifications/removeNotification",
  async (id, { dispatch }) => {
    try {
      await axios.delete(
        `http://localhost:3500/notifications/delete-notification/${id}`,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      )
      dispatch(getNotifications())
      return response.data
    } catch (error) {}
  }
)

export const clearNotifications = createAsyncThunk(
  "notifications/clearNotifications",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3500/notifications/clear-notifications/${id}`,
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
      state.notifications = state?.notifications?.concat(action.payload)
      state.notificationsCount = state?.notifications?.length
      state.notificationsUnread = state?.notificationsUnread + 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload?.map((notification) => {
          return createNotification(
            notification.name,
            {
              subtitle: notification.message,
              date: notification.date,
              link: notification.link,
              id: notification.id
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
      .addCase(clearNotifications.fulfilled, (state) => {
        state.notifications = []
        state.notificationsCount = 0
        state.notificationsUnread = 0
        state.notificationsRead = 0
        state.isLoading = false
      })
      .addCase(clearNotifications.pending, (state) => {
        state.isLoading = true
      })
  }
})

export const { setNotifications, addNotification } = notificationsSlice.actions

export default notificationsSlice.reducer
