// ** React Imports
import { useState, Fragment } from "react"
import ReactCountryFlag from "react-country-flag"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader
} from "reactstrap"

// ** Third Party Components
import Swal from "sweetalert2"
import Select from "react-select"
import { Check, Briefcase, X } from "react-feather"
import { useForm, Controller } from "react-hook-form"
import withReactContent from "sweetalert2-react-content"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import { useTranslation } from "react-i18next"

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary"
}

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary"
}

// const statusOptions = [
//   { value: "active", label: "Active" },
//   { value: "inactive", label: "Inactive" },
//   { value: "suspended", label: "Suspended" }
// ]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)
  const { t } = useTranslation()
  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: selectedUser.name,
      lastName: selectedUser.name.split(" ")[1],
      firstName: selectedUser.name.split(" ")[0]
    }
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar?.length) {
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
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      username: selectedUser.name,
      lastName: selectedUser.name.split(" ")[1],
      firstName: selectedUser.name.split(" ")[0]
    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.name
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.role]}
                      className="text-capitalize"
                    >
                      {selectedUser.role}
                    </Badge>
                  ) : null}
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
              countryCode={selectedUser.nationality.toLowerCase()}
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Last Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="username"
                  name="username"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="john.doe.007"
                      invalid={errors.username && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
