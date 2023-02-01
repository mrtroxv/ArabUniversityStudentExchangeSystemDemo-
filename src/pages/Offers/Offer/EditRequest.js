import React, { useContext, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
  InputGroupText,
  Input
} from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { updateRequest } from "../store"
import toast from "react-hot-toast"
import Select from "react-select"
import { selectThemeColors } from "../../../utility/Utils"
import { useTranslation } from "react-i18next"
import moment from "moment"
import { SocketContext } from "../../../utility/context/Socket"

const EditRequest = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [request, setRequest] = useState(props.request)
  const store = useSelector((state) => state?.appOffers?.selectedOffer?.offer)
  const users = useSelector((state) => state?.users?.allData?.activeUsers)
  const owner = users?.find((user) => user.ID === store?.university_id_src)
  const recepient = users?.find((user) => user.ID === store?.University_id_des)
  const { socket } = useContext(SocketContext)
  const requestSchema = Yup.object().shape({
    arrive_date: Yup.date().required("Arrival date is required"),
    arrive_time: Yup.string().required("Arrival time is required"),
    arrive_place: Yup.string().required("Arrival place is required"),
    lines_number: Yup.string().required("Lines number is required"),
    lines_name: Yup.string().required("Lines name is required"),
    dorm_start_date: Yup.date().when("dorm_choose", {
      is: false,
      then: Yup.date().required("Dormitory start date is required")
    }),
    dorm_end_date: Yup.date().when("dorm_choose", {
      is: false,
      then: Yup.date().required("Dormitory end date is required")
    })
  })

  const arrivePlaceOptions = [
    { value: "border", label: t("Border") },
    { value: "airport", label: t("Airport") }
  ]

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    setRequest(values)
    toast.promise(dispatch(updateRequest({ offer_id: store.id, values })), {
      loading: "Updating request...",
      success: () => {
        socket.emit("send-notification", {
          title: "Update request",
          user: recepient,
          message: `The request of the offer ${store?.name} has been updated by ${owner?.name}`,
          data: {
            type: "warning",
            id: store.id
          }
        })
        return "Request updated successfully"
      },
      error: "Error updating request"
    })
    setSubmitting(false)
    props.toggle()
  }

  const defaultValues = {
    arrive_date: moment(request?.arrive_date).format("YYYY-MM-DD"),
    arrive_time: request?.arrive_time,
    arrive_place: request?.arrive_place,
    lines_number: request?.lines_number,
    lines_name: request?.lines_name
  }

  return (
    <Container>
      <Formik
        initialValues={defaultValues}
        validationSchema={requestSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, setFieldValue }) => (
          <Form>
            <Col>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="arrive_date">
                    {t("Arrival Date")}
                  </Label>
                  <Field
                    type="date"
                    name="arrive_date"
                    placeholder="Arrival date"
                    className={`form-control ${
                      errors.arrive_date && touched.arrive_date && "is-invalid"
                    }`}
                  />

                  {errors.arrive_date && touched.arrive_date ? (
                    <div className="invalid-feedback">{errors.arrive_date}</div>
                  ) : null}
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="arrive_time">
                    {t("Arrival Time")}
                  </Label>
                  <Field
                    type="time"
                    name="arrive_time"
                    placeholder="Arrival time"
                    className={`form-control ${
                      errors.arrive_time && touched.arrive_time && "is-invalid"
                    }`}
                  />
                  {errors.arrive_time && touched.arrive_time ? (
                    <div className="invalid-feedback">{errors.arrive_time}</div>
                  ) : null}
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="arrive_place">
                    {t("Arrival Place")}
                  </Label>
                  <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    id="arrive_place"
                    options={arrivePlaceOptions}
                    className={`react-select ${
                      errors.arrive_place && touched.arrive_place
                        ? "is-invalid"
                        : ""
                    }`}
                    classNamePrefix="select"
                    onChange={(option) => {
                      setFieldValue("arrive_place", option.value)
                    }}
                    defaultValue={arrivePlaceOptions.find(
                      (option) => option.value === values.arrive_place
                    )}
                  />
                  {errors.arrive_place && touched.arrive_place ? (
                    <div className="invalid-feedback">
                      {errors.arrive_place}
                    </div>
                  ) : null}
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="lines_number">
                    {t("Lines Number")}
                  </Label>
                  <Field
                    type="text"
                    name="lines_number"
                    placeholder="Lines number"
                    className={`form-control ${
                      errors.lines_number &&
                      touched.lines_number &&
                      "is-invalid"
                    }`}
                  />
                  {errors.lines_number && touched.lines_number ? (
                    <div className="invalid-feedback">
                      {errors.lines_number}
                    </div>
                  ) : null}
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="lines_name">
                    {t("Lines Name")}
                  </Label>
                  <Field
                    type="text"
                    name="lines_name"
                    placeholder="Lines name"
                    className={`form-control ${
                      errors.lines_name && touched.lines_name && "is-invalid"
                    }`}
                  />
                  {errors.lines_name && touched.lines_name ? (
                    <div className="invalid-feedback">{errors.lines_name}</div>
                  ) : null}
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Field
                    type="checkbox"
                    name="dorm_choose"
                    id="dorm_choose"
                    placeholder="Dormitory choice"
                    className={`form-check-input ${
                      errors.dorm_choose && touched.dorm_choose && "is-invalid"
                    }`}
                  />
                  {errors.dorm_choose && touched.dorm_choose ? (
                    <div className="invalid-feedback">{errors.dorm_choose}</div>
                  ) : null}
                  <Label className="form-label ms-1" for="dorm_choose">
                    {t("Dormitory Choice")}
                  </Label>
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="dorm_start_date">
                    {t("Dormitory Start Date")}
                  </Label>
                  <Field
                    type="date"
                    name="dorm_start_date"
                    placeholder="Dormitory start date"
                    className={`form-control ${
                      errors.dorm_start_date &&
                      touched.dorm_start_date &&
                      "is-invalid"
                    }`}
                    disabled={values.dorm_choose === true}
                  />
                  {errors.dorm_start_date && touched.dorm_start_date ? (
                    <div className="invalid-feedback">
                      {errors.dorm_start_date}
                    </div>
                  ) : null}
                </div>
              </Row>
              <Row>
                <div className="mb-1">
                  <Label className="form-label" for="dorm_end_date">
                    {t("Dormitory End Date")}
                  </Label>
                  <Field
                    type="date"
                    name="dorm_end_date"
                    placeholder="Dormitory end date"
                    className={`form-control ${
                      errors.dorm_end_date &&
                      touched.dorm_end_date &&
                      "is-invalid"
                    }`}
                    disabled={values.dorm_choose === true}
                  />
                  {errors.dorm_end_date && touched.dorm_end_date ? (
                    <div className="invalid-feedback">
                      {errors.dorm_end_date}
                    </div>
                  ) : null}
                </div>
              </Row>
              <Row className="p-1">
                <Button
                  type="submit"
                  color={!isSubmitting ? "success" : "warning"}
                  disabled={isSubmitting}
                >
                  {t("Update Request")}
                </Button>
              </Row>
            </Col>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default EditRequest
