// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react"

// ** Custom Components
import Wizard from "@components/wizard"

// ** Steps
import CompanyDetails from "./components/CompanyDetails"
import TrainingDetails from "./components/TrainingDetails"
import StudentDetails from "./components/StudentDetails"

import { useTranslation } from "react-i18next"
import { createOffer, fetchAllOffers, selectCreateOfferState } from "../../../redux/project/offers"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

const OfferWizard = ({ type, onClose }) => {
  // ** Ref
  const ref = useRef(null)
  const dispatch = useDispatch()
  // eslint-disable-next-line
  const createOfferState = useSelector(selectCreateOfferState)
  console.log(createOfferState)

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

  useEffect(() => {
    console.log("1", createOfferState)
    if (createOfferState.status) {
      toast.success(t("Offer Created Successfully"))
      setTimeout(() => {
        onClose()
        dispatch(fetchAllOffers())
      }, 500)
    }
    if (createOfferState.error) {
      toast.error(createOfferState.error)
    }
  }, [createOfferState])

  const steps = [
    {
      id: "company-details",
      title: t("instituteTab"),
      subtitle: t("instituteTabSubTitle"),
      content: <CompanyDetails stepper={stepper} onStoreData={storeData} />
    },
    {
      id: "candidate-qualifications",
      title: t("qualificationTab"),
      subtitle: t("qualificationTabSubTitle"),
      content: <StudentDetails stepper={stepper} onStoreData={storeData} />
    },
    {
      id: "training-details",
      title: t("trainingTab"),
      subtitle: t("trainingTabSubTitle"),
      content: <TrainingDetails stepper={stepper} onSubmit={handelSubmit} />
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
