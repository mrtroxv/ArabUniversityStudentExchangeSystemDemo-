// ** React Imports
import { Fragment } from "react"

// ** Utils
import { selectThemeColors } from "@utils"

// ** Third Party Components
import * as Yup from "yup"
import { ArrowLeft, ArrowRight } from "react-feather"

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Select from "react-select"
import FormHeader from "./FormHeader"
import { useTranslation } from "react-i18next"

const StudyInformation = ({ stepper, onStoreData, initialData }) => {
  const { t } = useTranslation()
  const fluencyInEnglishOptions = [
    { value: "Good", label: t("good") },
    { value: "Medium", label: t("medium") },
    { value: "Excellent", label: t("excellent") }
  ]

  const defaultValues = {
    college: initialData ? initialData.college : "",
    universityMajor: initialData ? initialData.universityMajor : "",
    totalCreditHours: initialData ? initialData.totalCreditHours : "",
    fluencyInEnglish: initialData ? initialData.fluencyInEnglish : "",
    studyYears: initialData ? initialData.studyYears : "",
    studyYearFinished: initialData ? initialData.studyYearFinished : ""
  }

  const validationSchema = Yup.object({
    totalCreditHours: Yup.number().required("No total credit hours provided"),
    college: Yup.string().required("No college provided"),
    universityMajor: Yup.string().required("No university major provided"),
    fluencyInEnglish: Yup.string()
      .oneOf(fluencyInEnglishOptions.map((value) => value.value))
      .required("You have to pick one"),
    studyYears: Yup.number().required("No study years provided"),
    studyYearFinished: Yup.number().required("No study year finished provided")
  })

  return (
    <Fragment>
      <FormHeader title={t("studyTitle")} subtitle={t("studySubtitle")} />
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          onStoreData(values)
          stepper.next()
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <Row>
              <Col md="6" className="mb-1">
                <label htmlFor="college" className="form-label form-label">
                  {t("college")}
                </label>
                <Field
                  name="college"
                  className={`form-control ${
                    errors.college && touched.college ? "is-invalid" : ""
                  }`}
                  placeholder={t("collegeP")}
                />
                <ErrorMessage
                  name="college"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <label
                  htmlFor="universityMajor"
                  className="form-label form-label"
                >
                  {t("major")}
                </label>
                <Field
                  name="universityMajor"
                  className={`form-control ${
                    errors.universityMajor && touched.universityMajor
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder={t("universityMajorP")}
                />
                <ErrorMessage
                  name="universityMajor"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <label
                  htmlFor="totalCreditHours"
                  className="form-label form-label"
                >
                  {t("totalCreditHours")}
                </label>
                <Field
                  type="text"
                  name="totalCreditHours"
                  placeholder={t("totalCreditHours")}
                  className={`form-control ${
                    errors.totalCreditHours && touched.totalCreditHours
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={(e) => {
                    setFieldValue(
                      "totalCreditHours",
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }}
                />
                <ErrorMessage
                  name="totalCreditHours"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <label
                  htmlFor="fluencyInEnglish"
                  className="form-label form-label"
                >
                  {t("fluencyInEnglish")}
                </label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  id="fluencyInEnglish"
                  options={fluencyInEnglishOptions}
                  defaultValue={fluencyInEnglishOptions.find(
                    (option) => option.value === values.fluencyInEnglish
                  )}
                  className={`react-select ${
                    errors.fluencyInEnglish && touched.fluencyInEnglish
                      ? "is-invalid"
                      : ""
                  }`}
                  classNamePrefix="select"
                  onChange={(value) => {
                    values.fluencyInEnglish = value.value
                  }}
                />
                <ErrorMessage
                  name="fluencyInEnglish"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <label htmlFor="studyYears" className="form-label form-label">
                  {t("studyYears")}
                </label>
                <Field
                  name="studyYears"
                  className={`form-control ${
                    errors.studyYears && touched.studyYears ? "is-invalid" : ""
                  }`}
                  placeholder={t("studyYears")}
                />
                <ErrorMessage
                  name="studyYears"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <label
                  htmlFor="studyYearFinished"
                  className="form-label form-label"
                >
                  {t("studyYearFinished")}
                </label>
                <Field
                  name="studyYearFinished"
                  className={`form-control ${
                    errors.studyYearFinished && touched.studyYearFinished
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder={t("studyYearFinished")}
                />
                <ErrorMessage
                  name="studyYearFinished"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-between">
              <Button
                color="secondary"
                className="btn-prev"
                onClick={() => stepper.previous()}
              >
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

export default StudyInformation
