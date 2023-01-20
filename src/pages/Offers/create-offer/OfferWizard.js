// ** React Imports
import { Fragment, useRef, useState } from "react"

// ** Custom Components
import Wizard from "@components/wizard"

// ** Steps
import CompanyDetails from "./components/CompanyDetails"
import TrainingDetails from "./components/TrainingDetails"
import StudentDetails from "./components/StudentDetails"

import { useTranslation } from "react-i18next"
import moment, { isDate } from "moment"

const OfferWizard = ({ type, outerSubmit, initialData = {} }) => {
  // ** Ref
  const ref = useRef(null)
  // eslint-disable-next-line

  // ** State
  const [stepper, setStepper] = useState(null)

  const [data, setData] = useState(initialData)
  const { t } = useTranslation()

  const dateKeys = ["train_start_date", "train_end_date"]
  const newObject = { ...data }
  dateKeys.forEach((key) => {
    if (isDate(new Date(data[key])) && data[key] !== undefined) {
      const date = moment(data[key]).format("YYYY-MM-DD")
      newObject[key] = date
    }
  })

  const storeData = (newData) => {
    const newDataKeys = Object.keys(newData)
    newDataKeys.forEach((key) => {
      if (
        newData[key] === null ||
        newData[key] === "" ||
        newData[key] === "null" ||
        newData[key] === "undefined" ||
        newData[key] === undefined ||
        newData[key] === "NaN" ||
        newData[key] === "[]" ||
        newData[key] === "0" ||
        newData[key] === 0
      ) {
        delete newData[key]
      }
    })
    setData((prevData) => {
      return {
        ...prevData,
        ...newData
      }
    })
  }

  const handleSubmit = (newData) => {
    const newDataKeys = Object.keys(newData)
    newDataKeys.forEach((key) => {
      if (
        newData[key] === null ||
        newData[key] === "" ||
        newData[key] === "null" ||
        newData[key] === "undefined" ||
        newData[key] === undefined ||
        newData[key] === "NaN" ||
        newData[key] === "[]" ||
        newData[key] === "0" ||
        newData[key] === 0
      ) {
        delete newData[key]
      }
    })
    const submitData = {
      ...data,
      ...newData
    }
    outerSubmit(submitData)
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
          data={newObject}
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
          data={newObject}
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
          onSubmit={handleSubmit}
          data={newObject}
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
