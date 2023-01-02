import { useRef, useState } from "react"
import Wizard from "@components/wizard"
import CandidateInformation from "./components/CandidateInformation"
import StudyInformation from "./components/StudyInformation"
import ContactInformation from "./components/ContactInformation"
import { useTranslation } from "react-i18next"

const CandidateForm = () => {
  const { t } = useTranslation()
  const [stepper, setStepper] = useState(null)
  const ref = useRef(null)

  const [data, setData] = useState({})

  const submitHandler = (data) => {
    setData((prevData) => {
      return { ...prevData, ...data }
    })
  }

  const steps = [
    {
      id: "candidateInformation",
      title: t("candidate"),
      subtitle: t("enterInformation"),
      content: (
        <CandidateInformation stepper={stepper} onSubmit={submitHandler} />
      )
    },
    {
      id: "studyInformation",
      title: t("studyTitle"),
      subtitle: t("enterInformation"),
      content: <StudyInformation stepper={stepper} onSubmit={submitHandler} />
    },
    {
      id: "contactInformation",
      title: t("contact"),
      subtitle: t("enterInformation"),
      content: (
        <ContactInformation
          stepper={stepper}
          onSubmit={submitHandler}
          data={data}
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
