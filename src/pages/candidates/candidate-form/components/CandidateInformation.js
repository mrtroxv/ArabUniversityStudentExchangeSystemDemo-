// ** React Imports
import { Fragment } from "react"

// ** Utils
import { selectThemeColors } from "@utils"

// ** Third Party Components
import * as Yup from "yup"
import { ArrowLeft, ArrowRight } from "react-feather"

// ** Reactstrap Imports
import { Row, Col, Button, Label } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Select from "react-select"
import FormHeader from "./FormHeader"
import { useTranslation } from "react-i18next"
import useCountries from "../../../../utility/hooks/custom/useCountries"
import makeAnimated from "react-select/animated"

const CandidateInformation = ({ stepper, onSubmit }) => {
  const { t } = useTranslation()
  const { selectCountries } = useCountries()
  const genderOptions = [
    { value: t("male"), label: t("male") },
    { value: t("female"), label: t("female") }
  ]

  const defaultValues = {
    name: "",
    gender: "",
    nationality: "",
    birthDate: "",
    birthPlace: "",
    healthStatus: ""
  }
  const schema = Yup.object({
    name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long"),
    gender: Yup.string()
      .oneOf(genderOptions.map((value) => value.value))
      .required("You have to pick one"),
    city_id: Yup.string()
      .oneOf(selectCountries.map((place) => place.value))
      .required("No nationality provided"),
    birthDate: Yup.date().required("No birth date provided"),
    birthPlace: Yup.string().required("No birth place provided"),
    healthStatus: Yup.string().required("")
  })

  return (
    <Fragment>
      <FormHeader title={t("title")} subtitle={t("subtitle")} />
      <Formik
        initialValues={defaultValues}
        validationSchema={schema}
        onSubmit={async (values) => {
          onSubmit(values)
          stepper.next()
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Row>
              <Col md="6" className="mb-1">
                <label htmlFor="name" className="form-label form-label">
                  {t("name")}
                </label>
                <Field
                  name="name"
                  className={`form-control ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                  placeholder={t("nameP")}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`nationality`}>
                  {t("Country")}
                </Label>
                <Select
                  theme={selectThemeColors}
                  components={makeAnimated()}
                  id="nationality"
                  options={selectCountries}
                  getOptionLabel={(value) => value.lable}
                  className={`react-select ${
                    errors.nationality && touched.nationality
                      ? "is-invalid"
                      : ""
                  }`}
                  classNamePrefix="select"
                  onChange={(value) => {
                    values.city_id = value.value
                  }}
                />
                <ErrorMessage
                  name="nationality"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <label htmlFor="gender" className="form-label form-label">
                  {t("gender")}
                </label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  id="gender"
                  options={genderOptions}
                  className={`react-select ${
                    errors.gender && touched.gender ? "is-invalid" : ""
                  }`}
                  classNamePrefix="select"
                  onChange={(value) => {
                    values.gender = value.value
                  }}
                />
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <label htmlFor="healthStatus" className="form-label form-label">
                  {t("healthStatus")}
                </label>
                <Field
                  name="healthStatus"
                  className={`form-control ${
                    errors.healthStatus && touched.healthStatus
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder={t("healthStatus")}
                />
                <ErrorMessage
                  name="healthStatus"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <label htmlFor="birthPlace" className="form-label form-label">
                  {t("birthPlace")}
                </label>
                <Field
                  name="birthPlace"
                  className={`form-control ${
                    errors.birthPlace && touched.birthPlace ? "is-invalid" : ""
                  }`}
                  placeholder={t("birthPlaceP")}
                />
                <ErrorMessage
                  name="birthPlace"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <label htmlFor="birthDate" className="form-label form-label">
                  {t("birthDate")}
                </label>
                <Field
                  name="birthDate"
                  className={`form-control ${
                    errors.birthDate && touched.birthDate ? "is-invalid" : ""
                  }`}
                  type="date"
                />
                <ErrorMessage
                  name="birthDate"
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
              <Button type="submit" color="primary" className="btn-next">
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
export default CandidateInformation
