import mock from "../mock"
import jwt from "jsonwebtoken"
import { representativeData, universities } from "../universities"
import { data as offers } from "../offers"
const data = [
  {
    id: 1,
    username: "Ahmad Osama",
    password: "password1234",
    type: "user",
    name: "Ahmad Osama",
    status: "active",
    avatar:
      require("@src/assets/images/avatars/1673591531551_H1dqJMueRtGJ3STMwRtA_tK4ZWxDQWV4UZ18e.jpeg")
        .default
  },
  {
    id: 1261,
    username: "aaaaaaaaaaaa",
    password: "password1234",
    type: "user",
    name: "aseel khaled",
    status: "active",
    avatar: "0"
  },
  {
    id: 1262,
    username: "jshjshjs",
    password: "password1234",
    type: "user",
    name: "aseel khaled",
    status: "active",
    avatar: "0"
  },
  {
    id: 1263,
    username: "hhhhhhhhhhh",
    password: "password1234",
    type: "user",
    name: "aseel khaled",
    status: "active",
    avatar: "0"
  },
  {
    id: 1270,
    username: "mpobstss",
    password: "password1234",
    type: "user",
    name: "Huthaifa Salman",
    status: "active",
    avatar:
      require("@src/assets/images/avatars/1673633055225_photo_2021-11-18_16-51-39.png")
        .default
  },
  {
    id: 1271,
    username: "h.j.salman",
    password: "password1234",
    type: "user",
    name: "Mr.Test Man",
    status: "active",
    avatar: "0"
  },
  {
    id: 1287,
    username: "Sussy Baka",
    password: "password1234",
    type: "user",
    name: "Mr.Sussy Baken",
    status: "suspend",
    avatar: require("@src/assets/images/avatars/1673027073467_Huz2.png").default
  },
  {
    id: 1288,
    username: "AseelAseel",
    password: "password1234",
    type: "user",
    name: "AseelAseel",
    status: "suspend",
    avatar:
      require("@src/assets/images/avatars/1673237922511_Screenshot 2022-11-24 083823.png")
        .default
  },
  {
    id: 1290,
    username: "AmjadTest",
    password: "password1234",
    type: "user",
    name: "Amjad Test",
    status: "suspend",
    avatar:
      require("@src/assets/images/avatars/1673247985304_Screenshot_20221117_014943.png")
        .default
  },
  {
    id: 1291,
    username: "HuzSalmanTest",
    password: "password1234",
    type: "user",
    name: "Huthaifa Salman.pdf",
    status: "active",
    avatar:
      require("@src/assets/images/avatars/1673248102268_Screenshot_20230103_053015.png")
        .default
  },
  {
    id: 1292,
    username: "HuzSalman",
    password: "password1234",
    type: "admin",
    name: "Huthaifa Salman",
    status: "active",
    avatar: require("@src/assets/images/avatars/1673714696823_Huz2.jpg").default
  },
  {
    id: 1299,
    username: "Testing",
    password: "password1234",
    type: "user",
    name: "Eng. Hamza san",
    status: "suspend",
    avatar:
      require("@src/assets/images/avatars/1673998517822_Screenshot_20221110_024818.png")
        .default
  }
]

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
  secret: "dd5f3089-40c3-403d-af14-d0c228b05cb4",
  refreshTokenSecret: "7c4c1c50-3230-45bf-9eae-c9b2e401c767",
  expireTime: "10m",
  refreshTokenExpireTime: "10m"
}
const abilityUser = [
  { action: "read", subject: "ACL" },
  { action: "read", subject: "user" }
]

const abilityAdmin = [
  { action: "manage", subject: "admin" },
  { action: "read", subject: "user" }
]

mock.onPost("/jwt/login").reply((config) => {
  const { Username, password } = JSON.parse(config.data)
  const user = data.find(
    (u) => u.username === Username && u.password === password
  )
  if (!user) {
    return [404, "not found"]
  }
  const relation = representativeData.find((u) => u.user_id === user.id)
  if (!relation) {
    return [404, "not found"]
  }
  const university = universities.find(
    (university) => university.ID === relation.university_id
  )
  if (!university) {
    return [404]
  }
  const role = user["type"].toLowerCase()
  const ability = role === "admin" ? abilityAdmin : abilityUser
  const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expireTime
  })
  return [
    200,
    {
      id: user.id,
      username: user.username,
      ability,
      university_id: university.ID,
      logo: university.logo,
      EN_Name: university.EN_Name,
      AR_Name: university.AR_Name,
      email: university.email,
      role,
      avatar: user.avatar,
      name: user.name,
      accessToken
    }
  ]
})

mock.onPost("/jwt/register").reply((request) => {
  if (request.data.length > 0) {
    const { email, password, username } = JSON.parse(request.data)
    const isEmailAlreadyInUse = data.users.find((user) => user.email === email)
    const isUsernameAlreadyInUse = data.users.find(
      (user) => user.username === username
    )
    const error = {
      email: isEmailAlreadyInUse ? "This email is already in use." : null,
      username: isUsernameAlreadyInUse
        ? "This username is already in use."
        : null
    }

    if (!error.username && !error.email) {
      const userData = {
        email,
        password,
        username,
        fullName: "",
        avatar: null,
        role: "admin",
        ability: [
          {
            action: "manage",
            subject: "all"
          }
        ]
      }

      // Add user id
      const length = data.users.length
      let lastIndex = 0
      if (length) {
        lastIndex = data.users[length - 1].id
      }
      userData.id = lastIndex + 1

      data.users.push(userData)

      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expireTime
      })

      const user = Object.assign({}, userData)
      delete user["password"]
      const response = { user, accessToken }

      return [200, response]
    } else {
      return [200, { error }]
    }
  }
})

mock.onPost("/jwt/refresh-token").reply((request) => {
  const { refreshToken } = JSON.parse(request.data)

  try {
    const { id } = jwt.verify(refreshToken, jwtConfig.refreshTokenSecret)

    const userData = { ...data.users.find((user) => user.id === id) }

    const newAccessToken = jwt.sign({ id: userData.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    })
    const newRefreshToken = jwt.sign(
      { id: userData.id },
      jwtConfig.refreshTokenSecret,
      {
        expiresIn: jwtConfig.refreshTokenExpireTime
      }
    )

    delete userData.password
    const response = {
      userData,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }

    return [200, response]
  } catch (e) {
    const error = "Invalid refresh token"
    return [401, { error }]
  }
})

mock.onGet("/jwt/get-user-data").reply((config) => {
  const { id } = config.params
  const user = data.find((u) => u.id === id)
  if (!user) {
    return [404, "not found"]
  }
  const relation = representativeData.find((u) => u.user_id === user.id)
  if (!relation) {
    return [404, "not found"]
  }
  const university = universities.find(
    (university) => university.ID === relation.university_id
  )
  if (!university) {
    return [404]
  }
  const role = user["type"].toLowerCase()
  const ability = role === "admin" ? abilityAdmin : abilityUser
  const response = {
    id,
    username: user.username,
    ability,
    university_id: university.ID,
    logo: university.logo,
    EN_Name: university.EN_Name,
    AR_Name: university.AR_Name,
    email: university.email,
    role,
    avatar: user.avatar,
    name: user.name
  }
  return [200, response]
})

mock.onGet("/api/get-all-data").reply(() => {
  const newUsers = data.map((user) => {
    const relation = representativeData.find((u) => u.user_id === user.id)
    const university = universities.find((u) => u.ID === relation.university_id)
    return {
      ...user,
      ...university,
      startDate: relation.startDate
    }
  })
  return [
    200,
    {
      activeUsers: newUsers.filter((user) => user.status === "active"),
      suspendedUsers: newUsers.filter((user) => user.status === "suspend")
    }
  ]
})
mock.onGet("/api/get-user").reply((config) => {
  const { universityId } = config.params
  const relations = representativeData
    .filter((u) => u.university_id === universityId)
    .map((u) => u.user_id)
  const users = data.filter((u) => relations.includes(u.id))
  const university = universities.find((u) => u.ID === universityId)
  const offersList = offers.filter(
    (offer) => offer.university_id_src === university.ID
  )
  const response = {
    users,
    university,
    offers: offersList,
    activeUser: {
      ...university,
      ...users.find((user) => user.status === "active")
    }
  }
  return [200, response]
})
