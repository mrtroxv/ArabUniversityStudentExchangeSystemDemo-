// ** React Imports
import { Fragment } from "react"

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather"

// ** Reactstrap Imports
import { Label, Row, Col, Button } from "reactstrap"
import Select from "react-select"
import makeAnimated from "react-select/animated"
// import { selectThemeColors } from "@utils"

import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import {
  AR_Name,
  university_description,
  EN_Name,
  university_title,
  email
} from "./translations"
import FormHeader from "./FormHeader"
import { faxRegExp, phoneRegExp, urlRegExp } from "./constants"
import useCountries from "../../../../utility/hooks/custom/useCountries"
import { selectThemeColors } from "../../../../utility/Utils"

const UniversityDetails = ({ stepper, onSubmit }) => {
  const { t } = useTranslation()
  const { selectCountries } = useCountries()
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
    city_id: "",
    email: ""
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
    Location_O: Yup.string().min(
      8,
      "Too Short - address must be at least 8 characters long"
    ),
    Study_buisness: Yup.string(),
    url: Yup.string()
      .matches(urlRegExp, "Please provide a valid URL")
      .required("No URL specified"),
    city_id: Yup.string().oneOf(selectCountries.map((place) => place.value)),
    email: Yup.string().email().required("No email provided")
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
        {({ values, errors, touched }) => (
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
                  {t("Phone Number")}
                </Label>
                <Field
                  type="text"
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
                  {t("Fax Number")}
                </Label>
                <Field
                  type="text"
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
                <Label className="form-label" for={`city_id`}>
                  {t("Country")}
                </Label>
                <Select
                  theme={selectThemeColors}
                  components={makeAnimated()}
                  id="city_id"
                  options={selectCountries}
                  getOptionLabel={(value) => value.lable}
                  className={`react-select ${
                    errors.days_of_work && touched.days_of_work
                      ? "is-invalid"
                      : ""
                  }`}
                  classNamePrefix="select"
                  onChange={(value) => {
                    values.city_id = value.value
                  }}
                />
                <ErrorMessage
                  name="city_id"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
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
                  placeholder="ex. Private, non-profit"
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
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`url`}>
                  URL
                </Label>
                <Field
                  type="text"
                  name={`url`}
                  id={`url`}
                  placeholder="ex. https://ptuk.edu.ps/ar/"
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
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`email`}>
                  {t(email)}
                </Label>
                <Field
                  type="email"
                  name={`email`}
                  id={`email`}
                  placeholder="ex. m.a.khateeb@teachers.ptuk.edu.ps"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
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
