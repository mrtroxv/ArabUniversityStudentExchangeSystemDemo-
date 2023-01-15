// ** React Imports
import { Fragment } from "react"

// ** Third Party Components
import Select from "react-select"
import Cleave from "cleave.js/react"
import "cleave.js/dist/addons/cleave-phone.us"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback
} from "reactstrap"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import FileUploadInput from "../../views/forms/form-elements/file-uploader/FileUploadInput"
import FormHeader from "../users/create-user/new-user-form/FormHeader"
import { editUser } from "../users/store"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { getUserData } from "../../utility/Utils"

// // ** Utils
// import { selectThemeColors } from '@utils'

const AccountTabs = () => {
  // ** Hooks
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const store = useSelector((state) => state.users)
  const selectedUser = store?.selectedUser?.activeUser
  // ** States
  const defaultValues = {
    username: "",
    name: "",
    avatar: undefined,
    fax: "",
    email: "",
    phone: "",
    logo: undefined
  }
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const schema = Yup.object({
    username: Yup.string().min(
      5,
      "Too Short - Usename must be at least 5 characters long"
    ),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    name: Yup.string().min(
      8,
      "Too Short - Name must be at least 8 characters long"
    ),
    email: Yup.string().email("Please enter a valid email address"),
    fax: Yup.string().matches(phoneRegExp, "Fax number is not valid"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid")
  })

  // const onReset = (setFieldValue) => {
  //   setFieldValue("name", "")
  //   setFieldValue("username", "")
  //   setFieldValue("email", "")
  //   setFieldValue("fax", "")
  //   setFieldValue("logo", undefined)
  // }

  const onSubmit = (data) => {
    if (
      Object.values(data).some((field) => field?.length > 0) ||
      data.avatar ||
      data.logo
    ) {
      toast
        .promise(
          dispatch(
            editUser({
              id: selectedUser.id,
              ID: selectedUser.ID,
              ...data
            })
          ),
          {
            loading: "Loading Data...",
            success: "Data Loaded",
            error: "Error"
          }
        )
        .then(dispatch(getUserData()))
      setValues({
        username: "",
        name: "",
        avatar: undefined,
        logo: undefined,
        email: "",
        phone: "",
        fax: ""
      })
    } else {
      toast.error("No data provided, so nothing will be updated")
      setShow(false)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{t("accountTitle")}</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <Formik
            initialValues={defaultValues}
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, setFieldValue, resetForm }) => (
              <Form>
                <Row className="gy-1 pt-75">
                  <FormHeader title="User Information" />
                  <Col md={6} xs={12}>
                    <Label className="form-label" for={`name`}>
                      Name
                    </Label>
                    <Field
                      type="text"
                      name={`name`}
                      id={`name`}
                      placeholder="ex. Dr.Moutmad Al Khateeb"
                      className={`form-control ${
                        errors.name && touched.name ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for={`username`}>
                      Username
                    </Label>
                    <Field
                      type="text"
                      name={`username`}
                      id={`username`}
                      placeholder="ex. Dr.Moutmad Al Khateeb"
                      className={`form-control ${
                        errors.username && touched.username ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="p"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="avatar">
                      {t("Profile Picture")}
                    </Label>
                    <Card className="pt-1">
                      <FileUploadInput
                        id="avatar"
                        uploadPhoto={(file) => {
                          setFieldValue("avatar", file)
                        }}
                      />
                    </Card>
                  </Col>
                  <FormHeader title="University Information" />
                  <Col md={6} xs={12}>
                    <Label className="form-label" for={`email`}>
                      Email
                    </Label>
                    <Field
                      type="text"
                      name={`email`}
                      id={`email`}
                      placeholder="ex. example@example.com"
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
                  <Col md={6} xs={12}>
                    <Label className="form-label" for={`fax`}>
                      Fax
                    </Label>
                    <Field
                      type="text"
                      name={`fax`}
                      id={`fax`}
                      placeholder="ex. 02-932432"
                      className={`form-control ${
                        errors.fax && touched.fax ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="fax"
                      component="p"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for={`phone`}>
                      Phone
                    </Label>
                    <Field
                      type="text"
                      name={`phone`}
                      id={`phone`}
                      placeholder="ex. 0598456789"
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
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="logo">
                      {t("University Logo")}
                    </Label>
                    <Card className="pt-1">
                      <FileUploadInput
                        id="logo"
                        uploadPhoto={(file) => {
                          setFieldValue("logo", file)
                        }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} className="pt-2">
                    <Button type="submit" className="me-1" color="primary">
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      color="secondary"
                      outline
                      onClick={resetForm}
                    >
                      Discard
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
      {/* <DeleteAccount /> */}
    </Fragment>
  )
}

export default AccountTabs
