// ** React Imports
import { Fragment } from "react"

// ** Third Party Components
import Select from "react-select"
import { ArrowLeft, ArrowRight } from "react-feather"

// ** Reactstrap Imports
import { Label, Row, Col, Button } from "reactstrap"
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik"
import * as Yup from "yup"

// ** Utils
import { selectThemeColors } from "@utils"

import { useTranslation } from "react-i18next"

const CompanyDetails = ({ stepper, onSubmit, initialState }) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const faxRegExp = /^\+?[0-9]{6,}$/

  const { t } = useTranslation()
  // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu']
  const daysOfWorkOptions = [
    { value: "Sun", label: "Sun" },
    { value: "Mon", label: "Mon" },
    { value: "Tue", label: "Tue" },
    { value: "Wed", label: "Wed" },
    { value: "Thu", label: "Thu" }
  ]

  const placeOfWorkOptions = [
    { value: "Remote", label: "Remote" },
    { value: "On-Site", label: "On-Site" }
  ]
  console.log(initialState)
  const defaultValues = {
    inst_name: initialState.inst_name,
    inst_address: initialState.inst_address,
    place_of_work: initialState.place_of_work,
    train_aria: initialState.train_aria,
    trainer_name: initialState.trainer_name,
    days_of_work: initialState.days_of_work,
    inst_phone: initialState.inst_phone,
    inst_fax: initialState.inst_fax,
    weekly_hours: initialState.weekly_hours,
    daily_hours: initialState.daily_hours
  }

  const Schema = Yup.object().shape({
    inst_name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long"),

    inst_address: Yup.string()
      .required("No address provided")
      .min(8, "Too Short - address must be at least 8 characters long"),

    place_of_work: Yup.string()
      .required("You have to pick one")
      .oneOf(placeOfWorkOptions.map((place) => place.value)),
    train_aria: Yup.string()
      .required("No aria provided")
      .min(8, "Too Short - aria must be at least 8 characters long"),

    trainer_name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long"),

    days_of_work: Yup.array()
      .min(2, "Please select at least two days")
      .required("Please select at least two days"),

    inst_phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("No Phone Number provided"),

    inst_fax: Yup.string()
      .matches(faxRegExp, "Fax number is not valid")
      .required("No fax Number provided"),

    weekly_hours: Yup.number()
      .min(20, "Please increase Weekly Hours")
      .required("No weekly Hours provided"),

    daily_hours: Yup.number()
      .min(5, "Please increase Daily Hours")
      .required("No Daily Hours provided")
  })

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">{t("instituteTitle")}</h5>
        <small className="text-muted">{t("instituteSubTitle")}</small>
      </div>
      <Formik
        initialValues={defaultValues}
        validationSchema={Schema}
        onSubmit={async (values) => {
          onSubmit(values)
          stepper.next()
        }}
        validateOnChange="true"
      >
        {({ errors, touched, values }) => (
          <Form>
            <Row>
              <Col className="mb-1">
                <Label className="form-label" for={`inst_name`}>
                  {t("instituteName")}
                </Label>
                <Field
                  type="text"
                  name={`inst_name`}
                  id={`inst_name`}
                  placeholder="ex. Foothill Technology Solutions"
                  className={`form-control ${
                    errors.inst_name && touched.inst_name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="inst_name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col>
                <Label className="form-label" for={`inst_address`}>
                  {t("instituteAddress")}
                </Label>
                <Field
                  type="text"
                  name={`inst_address`}
                  id={`inst_address`}
                  placeholder="ex. Nablus/Palestine"
                  className={`form-control ${
                    errors.inst_address && touched.inst_address
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="inst_address"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`place_of_work`}>
                  {t("institutePlaceOfWork")}
                </Label>

                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  id="place_of_work"
                  options={placeOfWorkOptions}
                  className={`react-select ${
                    errors.place_of_work && touched.place_of_work
                      ? "is-invalid"
                      : ""
                  }`}
                  classNamePrefix="select"
                  onChange={(value) => {
                    values.place_of_work = value.value
                  }}
                />
                <ErrorMessage
                  name="place_of_work"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`train_aria`}>
                  {t("instituteTrainingType")}
                </Label>
                <Field
                  type="text"
                  name={`train_aria`}
                  id={`train_aria`}
                  placeholder="ex. Computer Science"
                  className={`form-control ${
                    errors.train_aria && touched.train_aria ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="train_aria"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`trainer_name`}>
                  {t("instituteTrainerName")}
                </Label>
                <Field
                  type="text"
                  name={`trainer_name`}
                  id={`trainer_name`}
                  placeholder="ex. Eng.Tamer Naana"
                  className={`form-control ${
                    errors.trainer_name && touched.trainer_name
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="trainer_name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="days_of_work">
                  {t("instituteDaysOfWork")}
                </Label>
                <Select
                  isMulti
                  isClearable={false}
                  theme={selectThemeColors}
                  id="days_of_work"
                  options={daysOfWorkOptions}
                  className={`react-select ${
                    errors.days_of_work && touched.days_of_work
                      ? "is-invalid"
                      : ""
                  }`}
                  classNamePrefix="select"
                  onChange={(value) => {
                    values.days_of_work = value.map((item) => item.value)
                  }}
                />
                <ErrorMessage
                  name="days_of_work"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`inst_phone`}>
                  {t("institutePhone")}
                </Label>
                <Field
                  type="number"
                  name={`inst_phone`}
                  id={`inst_phone`}
                  placeholder="ex. +970 512345678"
                  className={`form-control ${
                    errors.inst_phone && touched.inst_phone ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="inst_phone"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`inst_fax`}>
                  {t("instituteFax")}
                </Label>
                <Field
                  type="number"
                  name={`inst_fax`}
                  id={`inst_fax`}
                  placeholder="09-2945415"
                  className={`form-control ${
                    errors.inst_fax && touched.inst_fax ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="inst_fax"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`weekly_hours`}>
                  {t("instituteWeeklyHours")}
                </Label>
                <Field
                  type="number"
                  name={`weekly_hours`}
                  id={`weekly_hours`}
                  placeholder="ex. 35"
                  className={`form-control ${
                    errors.weekly_hours && touched.weekly_hours
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="weekly_hours"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`daily_hours`}>
                  {t("instituteDailyHours")}
                </Label>
                <Field
                  type="number"
                  name={`daily_hours`}
                  id={`daily_hours`}
                  placeholder="ex. 5"
                  className={`form-control ${
                    errors.daily_hours && touched.daily_hours
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="daily_hours"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button color="secondary" className="btn-prev" outline disabled>
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  {t("previous")}
                </span>
              </Button>
              <Button color="primary" className="btn-next" type="submit">
                <span className="align-middle d-sm-inline-block d-none">
                  {t("next")}
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}
export default CompanyDetails
