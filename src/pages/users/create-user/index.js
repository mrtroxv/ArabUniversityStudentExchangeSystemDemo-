// ** React Imports
import { Fragment, useRef, useState } from "react"

// ** Custom Components
import Wizard from "@components/wizard"

// ** Steps
import UniversityDetails from "./new-user-form/UniversityDetails"

import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import UserDetails from "./new-user-form/UserDetails"
// import toast from "react-hot-toast"

const NewUser = ({ type }) => {
  // ** Ref
  const ref = useRef(null)
  const dispatch = useDispatch()
  // eslint-disable-next-line
  // ** State
  const [stepper, setStepper] = useState(null)

  const [data, setData] = useState({})
  const { t } = useTranslation()
  const storeData = (data) => {
    setData((prevData) => {
      return { ...prevData, ...data }
    })
    // outerSubmit()
    console.log(data)
  }

  const handelSubmit = (values) => {
    dispatch(createOffer({ ...values, ...data }))
  }

  const steps = [
    {
      id: "user-details",
      title: t("User Details"),
      subtitle: t("user-details-sub"),
      content: <UserDetails stepper={stepper} onStoreData={storeData} />
    },
    {
      id: "university-details",
      title: t("University Details"),
      subtitle: t("university-details-sub"),
      content: <UniversityDetails stepper={stepper} onSubmit={handelSubmit} />
    }
  ]

  return (
    <Wizard
      type={type}
      options={{
        linear: false
      }}
      instance={(el) => setStepper(el)}
      ref={ref}
      steps={steps}
    />
  )
}

export default NewUser
