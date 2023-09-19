import mock from "../mock"
import { representativeData } from "../universities"
import { data as offers } from "../offers"

export const students = [
  {
    ID: 1,
    city_id: "EG",
    university_id: 1,
    college: "Engineering and Technology",
    universityMajor: "Computer System Engineer",
    birthPlace: "Giza",
    gender: "Male",
    passportExpiryDate: "2024-12-31",
    phone: "0945704354",
    email: "Bahgat.Saber@egybt.com",
    birthDate: "1988-12-31",
    address: "Egypt, Giza",
    passportNumber: "00223344556677889900",
    healthStatus: "Great",
    studyYearFinished: 4,
    studyYears: 5,
    fluencyInEnglish: "Excellent",
    totalCreditHours: 164,
    name: "محمود صابر"
  },
  {
    ID: 2,
    city_id: "AL",
    university_id: 1,
    college: "Engineering and Technology",
    universityMajor: "Computer System Engineer",
    birthPlace: "Giza",
    gender: "Male",
    passportExpiryDate: "2026-01-01",
    phone: "0945704354",
    email: "Bahgat.Saber@egybt.com",
    birthDate: "1988-12-31",
    address: "Egypt, Giza",
    passportNumber: "00223344556677889900",
    healthStatus: "Great",
    studyYearFinished: 4,
    studyYears: 5,
    fluencyInEnglish: "Medium",
    totalCreditHours: 164,
    name: "محمود صابر"
  },
  {
    ID: 3,
    city_id: "AG",
    university_id: 1,
    college: "Engineering and Technology",
    universityMajor: "Computer System Engineer",
    birthPlace: "Giza",
    gender: "Male",
    passportExpiryDate: "2027-12-31",
    phone: "0945704354",
    email: "huthaifajamal2@gmail.com",
    birthDate: "1988-12-31",
    address: "Egypt, Giza",
    passportNumber: "00223344556677889900",
    healthStatus: "Great",
    studyYearFinished: 4,
    studyYears: 5,
    fluencyInEnglish: "Good",
    totalCreditHours: 164,
    name: "محمود صابر"
  },
  {
    ID: 4,
    city_id: "AL",
    university_id: 1,
    college: "Engineering and Technology",
    universityMajor: "Computer System Engineer",
    birthPlace: "Giza",
    gender: "Male",
    passportExpiryDate: "2027-12-31",
    phone: "0945704354",
    email: "huthaifajamal2@gmail.com",
    birthDate: "1988-12-31",
    address: "Egypt, Giza",
    passportNumber: "00223344556677889900",
    healthStatus: "Great",
    studyYearFinished: 4,
    studyYears: 5,
    fluencyInEnglish: "Excellent",
    totalCreditHours: 164,
    name: "محمود صابر"
  },
  {
    ID: 5,
    city_id: "AF",
    university_id: 1152,
    college: "Engineering and Technology",
    universityMajor: "Computer System Engineer",
    birthPlace: "Giza",
    gender: "Male",
    passportExpiryDate: "2025-01-01",
    phone: "0945704354",
    email: "huthaifajamal2@gmail.com",
    birthDate: "1988-12-31",
    address: "Egypt, Giza",
    passportNumber: "00223344556677889900",
    healthStatus: "Great",
    studyYearFinished: 4,
    studyYears: 5,
    fluencyInEnglish: "Excellent",
    totalCreditHours: 164,
    name: "محمود صابر"
  },
  {
    ID: 6,
    city_id: "AF",
    university_id: 1152,
    college: "Engineering and Technology",
    universityMajor: "Computer System Engineer",
    birthPlace: "Giza",
    gender: "Male",
    passportExpiryDate: "2026-12-31",
    phone: "0945704354",
    email: "zaina.hgraba@gmail.com",
    birthDate: "1988-12-31",
    address: "Egypt, Giza",
    passportNumber: "00223344556677889900",
    healthStatus: "Great",
    studyYearFinished: 4,
    studyYears: 5,
    fluencyInEnglish: "Excellent",
    totalCreditHours: 164,
    name: "محمود صابر"
  }
]

export const requests = [
  {
    id: 3,
    status: 0,
    arrive_date: "0000-00-00",
    arrive_time: "",
    arrive_place: "",
    lines_number: 0,
    lines_name: "",
    dorm_choose: 0,
    dorm_start_date: "0000-00-00",
    dorm_end_date: "0000-00-00",
    student_id: 1,
    offer_id: 218,
    assignDate: "2023-01-01",
    submitDate: null,
    acceptDate: null
  },
  {
    id: 12,
    status: 1,
    arrive_date: "2023-02-16",
    arrive_time: "03:30",
    arrive_place: "airport",
    lines_number: 594360110,
    lines_name: "Airlines",
    dorm_choose: 0,
    dorm_start_date: "0000-00-00",
    dorm_end_date: "0000-00-00",
    student_id: 2,
    offer_id: 214,
    assignDate: "2023-01-01",
    submitDate: "2023-01-20",
    acceptDate: "2023-01-20 12:34:17"
  },
  {
    id: 14,
    status: 1,
    arrive_date: "2023-01-19",
    arrive_time: "10:52",
    arrive_place: "border",
    lines_number: 594360110,
    lines_name: "Salman Airlines",
    dorm_choose: 0,
    dorm_start_date: "0000-00-00",
    dorm_end_date: "0000-00-00",
    student_id: 6,
    offer_id: 157,
    assignDate: "2023-01-01",
    submitDate: null,
    acceptDate: null
  },
  {
    id: 17,
    status: 0,
    arrive_date: "0000-00-00",
    arrive_time: "",
    arrive_place: "",
    lines_number: 0,
    lines_name: "",
    dorm_choose: 0,
    dorm_start_date: "0000-00-00",
    dorm_end_date: "0000-00-00",
    student_id: 3,
    offer_id: 218,
    assignDate: "2023-01-01",
    submitDate: null,
    acceptDate: null
  },
  {
    id: 18,
    status: 1,
    arrive_date: "2023-01-20",
    arrive_time: "03:42",
    arrive_place: "border",
    lines_number: 594360110,
    lines_name: "Salman Airlines",
    dorm_choose: 0,
    dorm_start_date: "0000-00-00",
    dorm_end_date: "0000-00-00",
    student_id: 5,
    offer_id: 211,
    assignDate: "2023-01-01",
    submitDate: null,
    acceptDate: null
  },
  {
    id: 19,
    status: 1,
    arrive_date: "2023-01-21",
    arrive_time: "11:12",
    arrive_place: "border",
    lines_number: 594360110,
    lines_name: "Airlines",
    dorm_choose: 0,
    dorm_start_date: "0000-00-00",
    dorm_end_date: "0000-00-00",
    student_id: 4,
    offer_id: 216,
    assignDate: "2023-01-01",
    submitDate: "2023-01-20",
    acceptDate: null
  }
]

mock.onGet("/students/get-all-data").reply((config) => {
  const user_id = config.params.id
  const representative = representativeData.find(
    (data) => data.user_id === user_id
  )
  const universityStudents = students.filter(
    (student) => student.university_id === representative.university_id
  )
  return [200, universityStudents]
})

mock.onGet("/students/request-data").reply((config) => {
  const university_id = config.params.university_id
  const universityRequests = requests
    .filter((req) => {
      const student = students.find((student) => req.student_id === student.ID)
      if (student.university_id === university_id) return true
      return false
    })
    .map((request) => {
      const student = students.find((student) => req.student_id === student.ID)
      const offer = offers.find((offer) => offer.id === req.offer_id)
      return {
        ...request,
        ...student,
        ...offer
      }
    })
  return [200, universityRequests]
})

mock.onGet("/students/get-student").reply((config) => {
  const student_id = +config.params.studentId
  const student = students.find((student) => student.ID === student_id)
  const request = requests.find((request) => request.student_id === student_id)
  const offer = offers.find((offer) => offer.id === request.offer_id)
  return [
    200,
    {
      student,
      offer: {
        ...offer,
        ...request,
        id: offer.id,
        request_id: request.id,
        status: offer.status
      }
    }
  ]
})
