// ** React Imports
import { Fragment } from "react"

// ** Utils
// import { selectThemeColors } from "@utils"

// ** Third Party Components
import * as Yup from "yup"
// import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from "react-feather"
// import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap"

import { Formik, Form, Field, ErrorMessage } from "formik"
import Select from "react-select"
import FormHeader from "./FormHeader"
import { useTranslation } from "react-i18next"
import {
  member_description,
  member_email,
  member_name,
  member_title
} from "./translations"

const UserDetails = ({ stepper, onSubmit }) => {
  const { t } = useTranslation()

  const defaultValues = {
    name: "",
    id: "",
    nationality: ""
  }
  const schema = Yup.object({
    username: Yup.string()
      .required("No UserName provided")
      .min(8, "Too Short - Name must be at least 8 characters long"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    member_name: Yup.string()
      .required("No name provided")
      .min(8, "Too Short - Name must be at least 8 characters long"),
    member_email: Yup.string().email().required("No Email provided")
  })

  return (
    <Fragment>
      <FormHeader title={t(member_title)} subtitle={t(member_description)} />
      <Formik
        initialValues={defaultValues}
        validationSchema={schema}
        onSubmit={async (values) => {
          console.log({ values })
          onSubmit(values)
          stepper.next()
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`member_name`}>
                  {t(member_name)}
                </Label>
                <Field
                  type="text"
                  name={`member_name`}
                  id={`member_name`}
                  placeholder="ex. Dr.Moutmad Al Khateeb"
                  className={`form-control ${
                    errors.member_name && touched.member_name
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="member_name"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label" for={`member_email`}>
                  {t(member_email)}
                </Label>
                <Field
                  type="email"
                  name={`member_email`}
                  id={`member_email`}
                  placeholder="ex. m.a.khateeb@teachers.ptuk.edu.ps"
                  className={`form-control ${
                    errors.member_email && touched.member_email
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="member_email"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <label htmlFor="username" className="form-label form-label">
                  {t("User Name")}
                </label>
                <Field
                  name="username"
                  className={`form-control ${
                    errors.username && touched.username ? "is-invalid" : ""
                  }`}
                  placeholder={t("nameP")}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="invalid-feedback"
                />
              </Col>
              <Col md="6" className="mb-1">
                <label htmlFor="password" className="form-label form-label">
                  {t("Password")}
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                  placeholder={"*********"}
                />
                <ErrorMessage
                  name="password"
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

export default UserDetails
