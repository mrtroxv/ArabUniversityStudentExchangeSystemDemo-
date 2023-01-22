import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { AlertTriangle, Check, X } from "react-feather"
import { Link } from "react-router-dom"

// const notificationsArray = [
//     {
//       img: require("@src/assets/images/portrait/small/avatar-s-15.jpg").default,
//       subtitle: "Won the monthly best seller badge.",
//       title: (
//         <p className="media-heading">
//           <span className="fw-bolder">Congratulation Sam 🎉</span>winner!
//         </p>
//       )
//     },
//     {
//       img: require("@src/assets/images/portrait/small/avatar-s-3.jpg").default,
//       subtitle: "You have 10 unread messages.",
//       title: (
//         <p className="media-heading">
//           <span className="fw-bolder">New message</span>&nbsp;received
//         </p>
//       )
//     },
//     {
//       avatarContent: "MD",
//       color: "light-danger",
//       subtitle: "MD Inc. order updated",
//       title: (
//         <p className="media-heading">
//           <span className="fw-bolder">Revised Order 👋</span>&nbsp;checkout
//         </p>
//       )
//     },
//     {
//       title: <h6 className="fw-bolder me-auto mb-0">System Notifications</h6>,
//       switch: (
//         <div className="form-check form-switch">
//           <Input
//             type="switch"
//             name="customSwitch"
//             id="exampleCustomSwitch"
//             defaultChecked
//           />
//         </div>
//       )
//     },
//     {
//       avatarIcon: <X size={14} />,
//       color: "light-danger",
//       subtitle: "USA Server is down due to hight CPU usage",
//       title: (
//         <p className="media-heading">
//           <span className="fw-bolder">Server down</span>&nbsp;registered
//         </p>
//       )
//     },
//     {
//       avatarIcon: <Check size={14} />,
//       color: "light-success",
//       subtitle: "Last month sales report generated",
//       title: (
//         <p className="media-heading">
//           <span className="fw-bolder">Sales report</span>&nbsp;generated
//         </p>
//       )
//     },
//     {
//       avatarIcon: <AlertTriangle size={14} />,
//       color: "light-warning",
//       subtitle: "BLR Server using high memory",
//       title: (
//         <p className="media-heading">
//           <span className="fw-bolder">High memory</span>&nbsp;usage
//         </p>
//       )
//     }
//   ]

export function createSuccessNotification(name, data) {
  return {
    avatarIcon: data?.avatar || <Check size={14} />,
    color: data?.color || "light-success",
    subtitle: `${data?.subtitle}`,
    onClick: data?.onClick,
    title: (
      <p className="media-heading">
        <span className="fw-bolder">{name}</span>
      </p>
    )
  }
}

export function createWarningNotification(name, data) {
  return {
    avatarIcon: data?.avatar || <AlertTriangle size={14} />,
    color: data?.color || "light-warning",
    subtitle: `${data?.subtitle}`,
    onClick: data?.onClick,
    title: (
      <p className="media-heading">
        <span className="fw-bolder">{name}</span>
      </p>
    )
  }
}

export function createErrorNotification(name, data) {
  return {
    avatarIcon: data?.avatar || <X size={14} />,
    color: data?.color || "light-danger",
    subtitle: `${data?.subtitle}`,
    onClick: data?.onClick,
    title: (
      <p className="media-heading">
        <span className="fw-bolder">{name}</span>
      </p>
    )
  }
}

export function createInfoNotification(name, data) {
  return {
    avatarIcon: data?.avatar || <X size={14} />,
    color: data?.color || "light-info",
    subtitle: `${data.subtitle}`,
    onClick: data?.onClick,
    title: (
      <p className="media-heading">
        <span className="fw-bolder">{name}</span>
      </p>
    )
  }
}

const types = {
  info: (name, data) => createInfoNotification(name, data),
  success: (name, data) => createSuccessNotification(name, data),
  warning: (name, data) => createWarningNotification(name, data),
  error: (name, data) => createErrorNotification(name, data)
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
          return types[notification.type](notification.title, {
            subtitle: notification.body,
            color: notification.type
          })
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
