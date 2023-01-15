// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react"

// ** Custom Components
import Wizard from "@components/wizard"

// ** Steps
import CompanyDetails from "./components/CompanyDetails"
import TrainingDetails from "./components/TrainingDetails"
import StudentDetails from "./components/StudentDetails"

import { useTranslation } from "react-i18next"
import {
  fetchAllOffers,
  resetCreateOfferState,
  selectCreateOfferState
} from "../../../redux/project/offers"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import moment, { isDate } from "moment"

const OfferWizard = ({ type, onClose, outerSubmit, initialData = {} }) => {
  // ** Ref
  const ref = useRef(null)
  const dispatch = useDispatch()
  // eslint-disable-next-line
  const createOfferState = useSelector(selectCreateOfferState)

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

  useEffect(() => {
    // console.log("1", createOfferState)
    if (createOfferState.status) {
      toast.success(t("Offer Created Successfully"))
      setTimeout(() => {
        onClose()
        dispatch(fetchAllOffers())
      }, 300)
    }
    if (createOfferState.error) {
      toast.error(createOfferState.error)
    }
    dispatch(resetCreateOfferState())
  }, [createOfferState.status, createOfferState.error])

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
