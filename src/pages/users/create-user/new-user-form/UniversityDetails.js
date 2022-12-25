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
  university_AR_Name,
  university_description,
  university_EN_Name,
  university_title
} from "./translations"
import FormHeader from "./FormHeader"

const UniversityDetails = ({ stepper, onSubmit }) => {
  const { t } = useTranslation()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const faxRegExp = /^\+?[0-9]{6,}$/

  const defaultValues = {
    uni_name: "",
    member_name: "",
    member_email: "",
    uni_phone: "",
    uni_fax: ""
  }

  const UniversitySchema = Yup.object().shape({
    uni_en_name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long")
      .required("No Name provided"),
    uni_ar_name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long")
      .required("No Name provided"),
    uni_phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("No Phone Number provided"),
    uni_fax: Yup.string().matches(faxRegExp, "Fax number is not valid")
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
                <Label className="form-label" for={`uni_en_name`}>
                  {t(university_EN_Name)}
                </Label>
                <Field
                  type="text"
                  name={`uni_en_name`}
                  id={`uni_en_name`}
                  placeholder="ex. Palestinian Technical University"
                  className={`form-control ${
                    errors.uni_en_name && touched.uni_en_name
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="uni_en_name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`uni_ar_name`}>
                  {t(university_AR_Name)}
                </Label>
                <Field
                  type="text"
                  name={`uni_ar_name`}
                  id={`uni_ar_name`}
                  placeholder="ex. جامعة فلسطين التقنية"
                  className={`form-control ${
                    errors.uni_ar_name && touched.uni_ar_name
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="uni_ar_name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`uni_phone`}>
                  Phone Number
                </Label>
                <Field
                  type="number"
                  name={`uni_phone`}
                  id={`uni_phone`}
                  placeholder="+970-594360110"
                  className={`form-control ${
                    errors.uni_phone && touched.uni_phone ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="uni_phone"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-2">
                <Label className="form-label" for={`fax_phone`}>
                  Fax
                </Label>
                <Field
                  type="number"
                  name={`uni_fax`}
                  id={`uni_fax`}
                  placeholder="09-2945415"
                  className={`form-control ${
                    errors.uni_fax && touched.uni_fax ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="uni_fax"
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
