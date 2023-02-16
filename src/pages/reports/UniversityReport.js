import React, { useContext } from "react"
import { ErrorMessage, Form, Formik } from "formik"
import {
  FormGroup,
  Label,
  FormText,
  Col,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  CardText
} from "reactstrap"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { uploadUniversityReport } from "./store"
import "@styles/react/pages/page-authentication.scss"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { SocketContext } from "../../utility/context/Socket"
import moment from "moment"

const EvaluationReport = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const options = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" }
  ]
  const validationSchema = Yup.object().shape({
    student_performance: Yup.string().required(t("This field is required")),
    coworker_relationship: Yup.string().required(t("This field is required")),
    training_officer_relationship: Yup.string().required(
      t("This field is required")
    ),
    duty_performance: Yup.string().required(t("This field is required")),
    learning_ability: Yup.string().required(t("This field is required")),
    documentation_ability: Yup.string().required(t("This field is required"))
  })

  const selectedOffer = useSelector((state) => state.appOffers.selectedOffer)
  const { id } = useParams()
  const initialValues = {
    student_performance: "",
    coworker_relationship: "",
    training_officer_relationship: "",
    duty_performance: "",
    learning_ability: "",
    documentation_ability: ""
  }

  const labels = {
    student_performance: "Student's general performance",
    coworker_relationship: "Relationship with coworkers",
    training_officer_relationship: "Relationship with training officer",
    duty_performance: "Performance on duty",
    learning_ability: "Learning ability",
    documentation_ability: "Documentation ability"
  }

  const keys = Object.keys(initialValues)
  const { socket } = useContext(SocketContext)

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0 p-2">
          <CardHeader>
            <CardTitle
              style={{
                fontSize: "1.5rem"
              }}
              className="mb-1"
            >
              {t("University Evaluation Report")} {}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                //make a request to the server to insert the data
                const data = {
                  values,
                  requestId: selectedOffer?.request?.id || id
                }

                if (!selectedOffer?.request && !id) {
                  navigate(-1)
                  toast.error(t("There was a problem, try again later"))
                } else {
                  toast
                    .promise(dispatch(uploadUniversityReport(data)), {
                      loading: t("Submitting"),
                      success: t("Submitted successfully"),
                      error: t("There was a problem, try again later")
                    })
                    .then(() => {
                      socket?.emit("new-notification-update", {
                        user: selectedOffer?.offer?.University_id_des,
                        link: `/view-offers/${selectedOffer?.offer?.id}`,
                        message: `University has evaluated the student`,
                        name: "University Evaluation",
                        type: "info",
                        date: moment(),
                        update: {
                          type: "offer",
                          id: selectedOffer?.offer?.id
                        }
                      })
                      navigate(-1)
                    })
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  {keys.map((key, index) => (
                    <FormGroup key={index} className="border-bottom">
                      <Label for={key} className="mb-2">
                        <CardText
                          className="fw-bold"
                          style={{
                            fontSize: "1.2rem"
                          }}
                        >
                          {index + 1} - {t(labels[key])} :
                        </CardText>
                      </Label>
                      <Row className="mb-1">
                        {options.map((option) => (
                          <Col key={option.value}>
                            <Input
                              type="radio"
                              name={key}
                              id={`${key}_${option.value}`}
                              value={option.value}
                              className="mx-1"
                              onChange={(e) => {
                                setFieldValue(key, e.target.value)
                              }}
                            />
                            <Label
                              color="secondary"
                              style={{
                                fontSize: "1.2rem"
                              }}
                              for={`${key}_${option.value}`}
                            >
                              {t(option.label)}
                            </Label>
                          </Col>
                        ))}
                      </Row>
                      <ErrorMessage
                        component="p"
                        className="text-danger fw-bold"
                        name={key}
                      />
                    </FormGroup>
                  ))}
                  {/* Add similar FormGroups for the other fields */}
                  <div className="d-flex justify-content-end mx-3">
                    <Button color="primary" type="submit">
                      {t("Submit")}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default EvaluationReport
