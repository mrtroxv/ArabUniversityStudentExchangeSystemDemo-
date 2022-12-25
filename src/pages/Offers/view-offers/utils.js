export const findDestinationUniversity = (row, universities) => {
  const university = universities.find(
    (university) => university.id === row.university_id_des
  )
  return university
}

export const findSourceUniversity = (row, universities) => {
  const university = universities.find(
    (university) => university.id === row.university_id_src
  )
  return university
}
