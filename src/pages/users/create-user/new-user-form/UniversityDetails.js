// ** React Imports
import { Fragment } from "react"

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather"

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import {
  AR_Name,
  university_description,
  EN_Name,
  university_title
} from "./translations"
import FormHeader from "./FormHeader"

const UniversityDetails = ({ stepper, onSubmit }) => {
  const { t } = useTranslation()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const faxRegExp = /^\+?[0-9]{6,}$/
  const urlRegExp = /^https?$/
  const cityRegExp = /^((\\+[a-z]{1,2}))$/
  const defaultValues = {
    AR_Name: "",
    EN_Name: "",
    phone: "",
    Fax: "",
    hour_no_week: "",
    hour_no_day: "",
    Location_O: "",
    Study_buisness: "",
    url: "",
    city_id: ""
  }

  const UniversitySchema = Yup.object().shape({
    AR_Name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long")
      .required("No Name provided"),
    EN_Name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long")
      .required("No Name provided"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("No Phone Number provided"),
    Fax: Yup.string().matches(faxRegExp, "Fax number is not valid"),
    hour_no_week: Yup.number().min(20, "Please increase Weekly Hours"),
    hour_no_day: Yup.number().min(5, "Please increase Daily Hours"),
    Location_O: Yup.string()
      // .required("No address provided")
      .min(8, "Too Short - address must be at least 8 characters long"),
    Study_buisness: Yup.string(),
    url: Yup.string().matches(urlRegExp, "Please provide a valid URL"),
    city_id: Yup.string().matches(cityRegExp, "Please provide a valid city ID")
  })

  return (
    <Fragment>
      <FormHeader
        title={t(university_title)}
        subtitle={t(university_description)}
      />
      <Formik
        initialValues={defaultValues}
        validationSchema={UniversitySchema}
        onSubmit={async (values) => {
          onSubmit(values)
          stepper.next()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`EN_Name`}>
                  {t(EN_Name)}
                </Label>
                <Field
                  type="text"
                  name={`EN_Name`}
                  id={`EN_Name`}
                  placeholder="ex. Palestinian Technical University"
                  className={`form-control ${
                    errors.EN_Name && touched.EN_Name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="EN_Name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`AR_Name`}>
                  {t(AR_Name)}
                </Label>
                <Field
                  type="text"
                  name={`AR_Name`}
                  id={`AR_Name`}
                  placeholder="ex. جامعة فلسطين التقنية"
                  className={`form-control ${
                    errors.AR_Name && touched.AR_Name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="AR_Name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`phone`}>
                  Phone Number
                </Label>
                <Field
                  type="number"
                  name={`phone`}
                  id={`phone`}
                  placeholder="+970-594360110"
                  className={`form-control ${
                    errors.phone && touched.phone ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`Fax`}>
                  Fax
                </Label>
                <Field
                  type="number"
                  name={`Fax`}
                  id={`Fax`}
                  placeholder="09-2945415"
                  className={`form-control ${
                    errors.Fax && touched.Fax ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="Fax"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`Location_O`}>
                  {t("instituteAddress")}
                </Label>
                <Field
                  type="text"
                  name={`Location_O`}
                  id={`Location_O`}
                  placeholder="ex. Nablus/Palestine"
                  className={`form-control ${
                    errors.Location_O && touched.Location_O ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="Location_O"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`city_id`}>
                  City
                </Label>
                <Field
                  type="text"
                  name={`city_id`}
                  id={`city_id`}
                  placeholder="09-2945415"
                  className={`form-control ${
                    errors.city_id && touched.city_id ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="city_id"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`hour_no_week`}>
                  {t("instituteWeeklyHours")}
                </Label>
                <Field
                  type="number"
                  name={`hour_no_week`}
                  id={`hour_no_week`}
                  placeholder="ex. 35"
                  className={`form-control ${
                    errors.hour_no_week && touched.hour_no_week
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="hour_no_week"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`hour_no_day`}>
                  {t("instituteDailyHours")}
                </Label>
                <Field
                  type="number"
                  name={`hour_no_day`}
                  id={`hour_no_day`}
                  placeholder="ex. 5"
                  className={`form-control ${
                    errors.hour_no_day && touched.hour_no_day
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="hour_no_day"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`Study_buisness`}>
                  Study buisness
                </Label>
                <Field
                  type="text"
                  name={`Study_buisness`}
                  id={`Study_buisness`}
                  placeholder="ex. 35"
                  className={`form-control ${
                    errors.Study_buisness && touched.Study_buisness
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="Study_buisness"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`url`}>
                  URL
                </Label>
                <Field
                  type="number"
                  name={`url`}
                  id={`url`}
                  placeholder="ex. 5"
                  className={`form-control ${
                    errors.url && touched.url ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="url"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button
                color="secondary"
                className="btn-prev"
                outline
                onClick={() => stepper.previous()}
              >
                <ArrowLeft
                  size={14}
                  className="align-middle me-sm-25 me-0"
                ></ArrowLeft>
                <span className="align-middle d-sm-inline-block d-none">
                  Previous
                </span>
              </Button>
              <Button color="success" className="btn-next" type="submit">
                <span className="align-middle d-sm-inline-block d-none">
                  Submit
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
export default UniversityDetails
