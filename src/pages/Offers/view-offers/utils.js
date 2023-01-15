import { getUniversityName } from "../../../utility/Utils"

export const findDestinationUniversity = (row, universities, lang) => {
  const university = universities.find(
    (university) => university.ID === row.University_id_des
  )
  return getUniversityName(university, lang)
}

export const findSourceUniversity = (row, universities, lang) => {
  const university = universities.find(
    (university) => university.ID === row.university_id_src
  )
  return getUniversityName(university, lang)
}
