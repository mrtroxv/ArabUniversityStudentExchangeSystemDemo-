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
import { uploadStudentReport } from "./store"
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
    offer_match: Yup.string().required(t("This field is required")),
    training_program: Yup.string().required(t("This field is required")),
    program_rating: Yup.string().required(t("This field is required")),
    accommodation_difficulty: Yup.string().required(
      t("This field is required")
    ),
    food: Yup.string().required(t("This field is required")),
    housing: Yup.string().required(t("This field is required")),
    grad_req: Yup.string().required(t("This field is required")),
    employee_rating: Yup.string().required(t("This field is required")),
    management_rating: Yup.string().required(t("This field is required")),
    university_reception: Yup.string().required(t("This field is required")),
    coach_reception: Yup.string().required(t("This field is required")),
    recommendation: Yup.string().required(t("This field is required"))
  })

  const selectedOffer = useSelector((state) => state.appOffers.selectedOffer)
  const { id } = useParams()
  const initialValues = {
    offer_match: "",
    training_program: "",
    program_rating: "",
    management_rating: "",
    employee_rating: "",
    grad_req: "",
    housing: "",
    food: "",
    accommodation_difficulty: "",
    university_reception: "",
    coach_reception: "",
    recommendation: ""
  }

  const labels = {
    offer_match: t("Was the training according to the offer?"),
    training_program: t("Was there a training program?"),
    program_rating: t(
      "How would you rate the training program and its implementation?"
    ),
    management_rating: t(
      "How would you rate your relationship with the management?"
    ),
    employee_rating: t("How do you rate your relationship with employees?"),
    grad_req: t("Is training part of graduation requirements?"),
    housing: t("Did the trained body provide facilities in terms of housing?"),
    food: t("Did the trained body provide facilities for food?"),
    accommodation_difficulty: t(
      "Did you find it difficult to find accommodation?"
    ),
    university_reception: t(
      "How were you received from the receiving university?"
    ),
    coach_reception: t("How were you received by the coach?"),
    recommendation: t("Do you recommend training in this institution?")
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
                  requestId: selectedOffer?.request?.id || id,
                  offerId: selectedOffer?.offer?.id
                }

                if (!selectedOffer?.request && !id) {
                  navigate(-1)
                  toast.error(t("There was a problem, try again later"))
                } else {
                  toast
                    .promise(dispatch(uploadStudentReport(data)), {
                      loading: t("Submitting"),
                      success: t("Submitted successfully"),
                      error: t("There was a problem, try again later")
                    })
                    .then(() => {
                      socket?.emit("new-notification-update", {
                        user: selectedOffer?.offer?.university_id_src,
                        link: `/view-offers/${selectedOffer?.offer?.id}`,
                        message: `Student has evaluated the offer`,
                        name: "Student Evaluation",
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
              {({ setFieldValue, errors }) => (
                <Form>
                  {console.log(errors)}
                  {keys.map((key, index) => (
                    <FormGroup key={index} className="border-bottom">
                      <Label for={key} className="mb-2">
                        <CardText
                          className="fw-bold"
                          style={{
                            fontSize: "1.2rem"
                          }}
                        >
                          {index + 1} - {t(labels[key])}
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
