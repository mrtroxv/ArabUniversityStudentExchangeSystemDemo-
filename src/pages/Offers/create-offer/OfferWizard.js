// ** React Imports
import { Fragment, useRef, useState } from "react"

// ** Custom Components
import Wizard from "@components/wizard"

// ** Steps
import CompanyDetails from "./components/CompanyDetails"
import TrainingDetails from "./components/TrainingDetails"
import StudentDetails from "./components/StudentDetails"

import { useTranslation } from "react-i18next"
import axios from "axios"

const OfferWizard = ({ type, initialState, onClose }) => {
  // ** Ref
  const ref = useRef(null)

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
    console.table({ ...values, ...data })
    axios.post('http://localhost:3500/offer/insert_offer', {
      ...data, ...values
    }, {
      headers: {
        authorization: JSON.parse(localStorage.getItem('accessToken'))
      }
    }).then((response) => {
      console.log(response)
      onClose()
    }).catch((error) => {
      console.log(error)
    })

  }

  const steps = [
    {
      id: "company-details",
      title: t("instituteTab"),
      subtitle: t("instituteTabSubTitle"),
      content: (
        <CompanyDetails
          stepper={stepper}
          onStoreData={storeData}
          initialState={initialState}
        />
      )
    },
    {
      id: "candidate-qualifications",
      title: t("qualificationTab"),
      subtitle: t("qualificationTabSubTitle"),
      content: (
        <StudentDetails
          stepper={stepper}
          onStoreData={storeData}
          initialState={initialState}
        />
      )
    },
    {
      id: "training-details",
      title: t("trainingTab"),
      subtitle: t("trainingTabSubTitle"),
      content: (
        <TrainingDetails
          stepper={stepper}
          onSubmit={handelSubmit}
          initialState={initialState}
        />
      )
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

export default OfferWizard
