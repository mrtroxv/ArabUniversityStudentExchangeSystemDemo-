// ** React Imports
// eslint-disable
import { Fragment } from "react"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback
} from "reactstrap"

// ** Third Party Components
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"
import { useTranslation } from "react-i18next"

import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { changePassword } from "./store"
const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ""
  }
}

const defaultValues = {
  newPassword: "",
  currentPassword: "",
  retypeNewPassword: ""
}

const SecurityTabContent = () => {
  const dispatch = useDispatch()

  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, (obj) =>
        showErrors("Current Password", obj.value.length, obj.min)
      )
      .required(),
    newPassword: yup
      .string()
      .min(8, (obj) => showErrors("New Password", obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .min(8, (obj) =>
        showErrors("Retype New Password", obj.value.length, obj.min)
      )
      .required()
      .oneOf([yup.ref(`newPassword`), null], "Passwords must match")
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const { t } = useTranslation()
  const handelDataSubmition = (data) => {
    console.log(data)
    toast.promise(dispatch(changePassword(data)), {
      loading: "Loading",
      success: (data) => {
        console.log(data)
        return "Password Changed Successfully"
      },
      error: () => {
        return "Error"
      }
    })
  }

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      console.log(data)
      handelDataSubmition(data)
      return null
    } else {
      console.log("error")
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{t("changePassword")}</CardTitle>
        </CardHeader>
        <CardBody className="pt-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Controller
                  control={control}
                  id="currentPassword"
                  name="currentPassword"
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t("currentPassword")}
                      htmlFor="currentPassword"
                      className="input-group-merge"
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback className="d-block">
                    {errors.currentPassword.message}
                  </FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="mb-1">
                <Controller
                  control={control}
                  id="newPassword"
                  name="newPassword"
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t("newPassword")}
                      htmlFor="newPassword"
                      className="input-group-merge"
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && (
                  <FormFeedback className="d-block">
                    {errors.newPassword.message}
                  </FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Controller
                  control={control}
                  id="retypeNewPassword"
                  name="retypeNewPassword"
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t("retypePassword")}
                      htmlFor="retypeNewPassword"
                      className="input-group-merge"
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className="d-block">
                    {errors.retypeNewPassword.message}
                  </FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <p className="fw-bolder">{t("requirments")}</p>
                <ul className="ps-1 ms-25">
                  <li className="mb-50">{t("requirments1")}</li>
                  <li className="mb-50">{t("requirments2")}</li>
                  <li>{t("requirments3")}</li>
                </ul>
              </Col>
              <Col className="mt-1" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  Save changes
                </Button>
                <Button color="secondary" outline>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTabContent
