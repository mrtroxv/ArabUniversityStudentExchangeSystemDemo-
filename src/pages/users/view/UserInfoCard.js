// ** React Imports
import { useState, Fragment } from "react"
import ReactCountryFlag from "react-country-flag"
import * as Yup from "yup"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  CardText
} from "reactstrap"

// ** Third Party Components
import Select from "react-select"
import { Check, Briefcase, X } from "react-feather"
import { Formik, Form, Field, ErrorMessage } from "formik"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import { useTranslation } from "react-i18next"
import FileUploadInput from "../../../views/forms/form-elements/file-uploader/FileUploadInput"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../../redux/authentication"
// import { suspendUser } from "../store"
import ReactivateAccount from "./ReactivateAccount"
import store, { editUser } from "../store"
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner"
import FormHeader from "../create-user/new-user-form/FormHeader"
import { getUserData } from "../../../utility/Utils"

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  user: "light-success",
  subscriber: "light-primary"
}

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary"
}

const UserInfoCard = ({ selectedUser, refetchData }) => {
  // ** State
  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  // ** Hook
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

  // ** render user img
  const renderUserImg = () => {
    if (
      selectedUser !== null &&
      selectedUser !== "0" &&
      selectedUser.avatar?.length
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={selectedUser.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.avatarColor || "light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedUser.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%"
          }}
          style={{
            height: "110px",
            width: "110px"
          }}
        />
      )
    }
  }

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
    } else {
      toast.error("No data provided, so nothing will be updated")
      setShow(false)
    }
  }

  if (store.isLoading) {
    return <SpinnerComponent />
  }
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section mb-1">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.name
                      : "Eleanor Aguilar"}
                  </h4>

                  <Badge
                    color={roleColors[selectedUser.role]}
                    className="text-capitalize "
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <ReactCountryFlag
              svg
              style={{
                height: "10%",
                width: "10%"
              }}
              className="country-flag flag-icon"
              countryCode={selectedUser?.city_id?.toLowerCase()}
            />
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">
            {t("userDetails")}
          </h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("Username")} :</span>
                  <span>{selectedUser.username}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">
                    {t("Email Address")} :
                  </span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("Status")} :</span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[selectedUser.status]}
                  >
                    {selectedUser.status}
                  </Badge>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("Role")} :</span>
                  <span className="text-capitalize">{selectedUser.type}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("Phone Number")} :</span>
                  <span>{selectedUser.phone}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              Edit
            </Button>

            {user.role === "admin" && (
              <Button
                className="ms-1"
                color="danger"
                outline
                onClick={() => setIsOpen(true)}
              >
                Suspend
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Formik
            initialValues={defaultValues}
            validationSchema={schema}
            onSubmit={async (values) => onSubmit(values)}
          >
            {({ errors, touched, setFieldValue }) => (
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
                  <Col xs={12} className="text-center pt-50">
                    <Button type="submit" className="me-1" color="primary">
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      color="secondary"
                      outline
                      onClick={() => {
                        setFieldValue("name", "")
                        setFieldValue("username", "")
                        setFieldValue("email", "")
                        setFieldValue("fax", "")
                        setFieldValue("logo", undefined)
                        setShow(false)
                      }}
                    >
                      Discard
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
      <ReactivateAccount
        open={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
        id={selectedUser.id}
        university_id={selectedUser.ID}
        refetchData={refetchData}
      />
    </Fragment>
  )
}

export default UserInfoCard
