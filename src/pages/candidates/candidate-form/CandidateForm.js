import { useRef, useState } from "react"
import Wizard from "@components/wizard"
import CandidateInformation from "./components/CandidateInformation"
import StudyInformation from "./components/StudyInformation"
import ContactInformation from "./components/ContactInformation"
import { useTranslation } from "react-i18next"
import moment, { isDate } from "moment"
const CandidateForm = ({ outerSubmit, initialData = {} }) => {
  const { t } = useTranslation()
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const [data, setData] = useState(initialData)

  const dateKeys = ["passportExpiryDate", "birthDate"]
  const newObject = { ...data }
  dateKeys.forEach((key) => {
    if (isDate(new Date(data[key])) && data[key] !== undefined) {
      const date = moment(data[key]).format("YYYY-MM-DD")
      newObject[key] = date
    }
  })

  const onStoreData = (newData) => {
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

  const submitHandler = (newData) => {
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
      id: "candidateInformation",
      title: t("candidate"),
      subtitle: t("enterInformation"),
      content: (
        <CandidateInformation
          stepper={stepper}
          onStoreData={onStoreData}
          initialData={newObject}
        />
      )
    },
    {
      id: "studyInformation",
      title: t("studyTitle"),
      subtitle: t("enterInformation"),
      content: (
        <StudyInformation
          stepper={stepper}
          onStoreData={onStoreData}
          initialData={newObject}
        />
      )
    },
    {
      id: "contactInformation",
      title: t("contact"),
      subtitle: t("enterInformation"),
      content: (
        <ContactInformation
          stepper={stepper}
          onStoreData={submitHandler}
          initialData={newObject}
        />
      )
    }
  ]
  return (
    <Wizard
      type="vertical"
      options={{
        linear: false
      }}
      instance={(el) => setStepper(el)}
      ref={ref}
      steps={steps}
    />
  )
}

export default CandidateForm
