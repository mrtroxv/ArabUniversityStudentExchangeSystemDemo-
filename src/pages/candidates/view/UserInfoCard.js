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
import withReactContent from "sweetalert2-react-content"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import { useTranslation } from "react-i18next"
import CandidateForm from "../candidate-form/CandidateForm"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { updateCandidate } from "../store"

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary"
}

const statusColors = {
  enrolled: "light-success",
  pending: "light-warning",
  inactive: "light-secondary"
}

// const statusOptions = [
//   { value: "active", label: "Active" },
//   { value: "inactive", label: "Inactive" },
//   { value: "suspended", label: "Suspended" }
// ]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser, university, offer }) => {
  // ** State
  const [show, setShow] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  // ** Hook
  const handleEditCandidate = (data) => {
    toast.promise(dispatch(updateCandidate(data)), {
      loading: t("common:loading"),
      success: () => {
        setShow(false)
        return t("common:success")
      },
      error: (err) => {
        console.log(err)
        return t("common:error")
      }
    })
  }
  // ** render user img
  const renderUserImg = () => {
    if (university && university?.logo?.length) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={university?.logo}
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

  const enrolled = offer && offer.id ? "enrolled" : "pending"

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
              countryCode={selectedUser.city_id.toLowerCase()}
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
                    color={statusColors[enrolled]}
                  >
                    {enrolled}
                  </Badge>
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
        <ModalBody>
          <CandidateForm
            outerSubmit={handleEditCandidate}
            initialData={selectedUser}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
