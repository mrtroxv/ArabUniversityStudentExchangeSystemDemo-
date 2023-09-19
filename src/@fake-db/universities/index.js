import mock from "../mock"

export const representativeData = [
  {
    ID: 1,
    university_id: 1,
    user_id: 1,
    end_date: Date("2023-01-19"),
    start_date: "2022-07-20"
  },
  {
    ID: 5,
    university_id: 2,
    user_id: 1261,
    end_date: null,
    start_date: "2022-12-27"
  },
  {
    ID: 6,
    university_id: 4,
    user_id: 1262,
    end_date: null,
    start_date: "2022-12-27"
  },
  {
    ID: 7,
    university_id: 5,
    user_id: 1263,
    end_date: null,
    start_date: "2022-12-27"
  },
  {
    ID: 8,
    university_id: 1152,
    user_id: 1270,
    end_date: null,
    start_date: "2022-12-31"
  },
  {
    ID: 19,
    university_id: 1153,
    user_id: 1271,
    end_date: null,
    start_date: "2023-01-06"
  },
  {
    ID: 24,
    university_id: 1185,
    user_id: 1287,
    end_date: "2023-01-09",
    start_date: "2023-01-06"
  },
  {
    ID: 25,
    university_id: 1185,
    user_id: 1288,
    end_date: "2023-01-17",
    start_date: "2023-01-08"
  },
  {
    ID: 29,
    university_id: 1185,
    user_id: 1290,
    end_date: "2023-01-17",
    start_date: "2023-01-09"
  },
  {
    ID: 30,
    university_id: 1185,
    user_id: 1291,
    end_date: null,
    start_date: "2023-01-09"
  },
  {
    ID: 31,
    university_id: 1186,
    user_id: 1292,
    end_date: null,
    start_date: "2023-01-14"
  },
  {
    ID: 32,
    university_id: 1,
    user_id: 1299,
    end_date: null,
    start_date: "2023-01-17"
  }
]
export const universities = [
  {
    ID: 1,
    EN_Name: "Palestine university kodoorie",
    AR_Name: "جامعة خضوري",
    Location_O: "طولكرم",
    Study_business: "اكاديمي",
    work_day: "احد-الحميس",
    hour_no_week: 45,
    phone: "595098952",
    Fax: "2693256",
    hour_no_day: 9,
    url: "https://ptuk.edu.ps/ar",
    email: "ptuk.ps",
    city_id: "PS",
    logo: require("@src/assets/images/avatars/1673436208916_ptuk.jpg").default,
    role: "user"
  },
  {
    ID: 2,
    EN_Name: "Jerusalem open",
    AR_Name: "القدس المفتوحة",
    Location_O: "طولكرم بجانب ال kfc",
    Study_business: "دبلوم - بكالوريس",
    work_day: "احد - خميس",
    hour_no_week: 45,
    phone: "595098952",
    Fax: "2693256",
    hour_no_day: 9,
    url: "non",
    email: "alqudes.open@mail.ps",
    city_id: "PS",
    logo: require("@src/assets/images/avatars/1673586198286_png-transparent-al-quds-open-university-al-quds-university-student-college-student-emblem-people-logo-thumbnail.png")
      .default,
    role: "user"
  },
  {
    ID: 4,
    EN_Name: "The University of Jordan",
    AR_Name: "الجامعة الأردنية الهاشمية",
    Location_O: "الجبيهة",
    Study_business: "أكاديمي",
    work_day: "السبت-الاربعاء",
    hour_no_week: 20,
    phone: "598241307",
    Fax: "2946872",
    hour_no_day: 4,
    url: "http://ju.edu.jo/ar/arabic/home.aspx",
    email: "Ju.edu.jo",
    city_id: "JO",
    logo: require("@src/assets/images/avatars/1673632816694_png-clipart-hashemite-university-princess-sumaya-university-for-technology-university-of-jordan-tafila-technical-university-the-university-thumbnail.png")
      .default,
    role: "user"
  },
  {
    ID: 5,
    EN_Name: "Cairo University",
    AR_Name: "جامعة القاهرة",
    Location_O: "الجيزة",
    Study_business: "مهني",
    work_day: "الاثنين-الخميس",
    hour_no_week: 30,
    phone: "44337709",
    Fax: "456789",
    hour_no_day: 7,
    url: "https://cu.edu.eg/ar/Home",
    email: "Cu.edu.eg",
    city_id: "EG",
    logo: require("@src/assets/images/avatars/1673632407898_img1.png").default,
    role: "user"
  },
  {
    ID: 1152,
    EN_Name: "Harvard University",
    AR_Name: "جامعة هارفرد",
    Location_O: "Cambridge, MA, United States",
    Study_business: "Private, non-profit",
    work_day: null,
    hour_no_week: 35,
    phone: "594360110",
    Fax: "",
    hour_no_day: 5,
    url: "https://www.harvard.edu/",
    email: "harvard@harvard.edu",
    city_id: "US",
    logo: require("@src/assets/images/avatars/1673631786669_Harvard_University_shield.png")
      .default,
    role: "user"
  },
  {
    ID: 1153,
    EN_Name: "Test University",
    AR_Name: "جامعة اختبار",
    Location_O: "Nablus, Palestine",
    Study_business: "Governer",
    work_day: null,
    hour_no_week: 35,
    phone: "594360115",
    Fax: "",
    hour_no_day: 5,
    url: "https://getbootstrap.com/",
    email: "h.j.salman@students.ptuk.edu.ps",
    city_id: "PS",
    logo: require("@src/assets/images/avatars/1673632869067_m-transparent.webp")
      .default,
    role: "user"
  },
  {
    ID: 1185,
    EN_Name: "Seko University",
    AR_Name: "جامعة السيكو بيكو",
    Location_O: "Izbat Salman",
    Study_business: "Private, non-profit",
    work_day: null,
    hour_no_week: 0,
    phone: "3443525342",
    Fax: "",
    hour_no_day: 0,
    url: "github.com",
    email: "User@DESKTOP-R1135EN.com",
    city_id: "DZ",
    logo: require("@src/assets/images/avatars/1673632833656_H1dqJMueRtGJ3STMwRtA_tK4ZWxDQWV4UZ18e.jpeg")
      .default,
    role: "user"
  },
  {
    ID: 1186,
    EN_Name: "Admin User",
    AR_Name: "جامعة مخفية",
    Location_O: "Izbat Salman",
    Study_business: "Private, non-profit",
    work_day: null,
    hour_no_week: 40,
    phone: "0594360110",
    Fax: "",
    hour_no_day: 8,
    url: "https://www.linkedin.com/in/huthaifa-jamal/",
    email: "hsalman@restaurant365.com",
    city_id: "PS",
    logo: "",
    role: "admin"
  }
]

mock.onGet("/api/universities").reply(() => {
  return [200, universities]
})

mock.onPost("/api/add-user").reply((config) => {
  const {
    username,
    password,
    name,
    email,
    AR_Name,
    EN_Name,
    phone,
    Fax,
    hour_no_week,
    hour_no_day,
    Location_O,
    Study_buisness,
    url,
    city_id
  } = JSON.parse(config.data)

  if (
    !username ||
    !password ||
    !name ||
    !email ||
    !AR_Name ||
    !EN_Name ||
    !phone ||
    !Fax ||
    !hour_no_week ||
    !hour_no_day ||
    !Location_O ||
    !Study_buisness ||
    !url ||
    !city_id
  ) {
    return [400, "missing required fields"]
  }

  const existingUser = users.find((user) => user.username === username)

  if (existingUser) {
    return [400, "username already exists"]
  }

  const existingUniversity = universities.find(
    (university) =>
      university.email === email ||
      university.phone === phone ||
      university.url === url ||
      (university.EN_Name === EN_Name && university.AR_Name === AR_Name)
  )

  if (existingUniversity) {
    return [400, "university details are already in use"]
  }

  const universityId = universities.length + 1
  const user = {
    id: users.length + 1,
    username,
    password: md5(password),
    type: "user",
    name,
    avatar: ""
  }

  const representative = {
    university_id: universityId,
    start_date: new Date().toISOString().slice(0, 10),
    user_id: user.id
  }

  universities.push({
    ID: universityId,
    EN_Name,
    AR_Name,
    Location_O,
    Study_buisness,
    phone,
    Fax,
    hour_no_week,
    hour_no_day,
    url,
    city_id,
    email,
    logo: "",
    representative_id: representative.user_id
  })

  users.push(user)

  representatives.push(representative)

  return [200, "Added User successfully"]
})
mock.onGet("/api/get-university-data").reply((config) => {
  const university_id = config.params.universityId
  const university = universities.find(
    (university) => university.ID === university_id
  )
  return [200, university]
})
