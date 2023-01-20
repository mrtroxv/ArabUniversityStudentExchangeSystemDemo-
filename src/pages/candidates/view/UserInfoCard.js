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
import { useDispatch, useSelector } from "react-redux"
import { updateCandidate } from "../store"
import { selectUser } from "../../../redux/authentication"
import { selectUniversity } from "../../users/store"

const statusColors = {
  enrolled: "success",
  pending: "warning",
  inactive: "info"
}

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser, offer }) => {
  // ** State
  const [show, setShow] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const studentUniversity = useSelector((state) =>
    selectUniversity(state, selectedUser.university_id)
  )
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
    if (studentUniversity && studentUniversity?.logo?.length) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={studentUniversity?.logo}
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

  const status = offer && offer.id ? "enrolled" : "pending"

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
                  {selectedUser && (
                    <Badge
                      color={statusColors[status]}
                      className="text-capitalize"
                    >
                      {status}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-3">
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
                  <span className="fw-bolder me-25">{t("gender")} :</span>
                  <span>{selectedUser.gender}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("email")} :</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("Phone Number")} :</span>
                  <span>{selectedUser.phone}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("address")} :</span>
                  <span>{selectedUser.address}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("college")} :</span>
                  <span>{selectedUser.college}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">{t("major")} :</span>
                  <span>{selectedUser.universityMajor}</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">
                    {t("Acadimic State")} :
                  </span>
                  <span>
                    Completed {selectedUser.studyYearFinished} of{" "}
                    {selectedUser.studyYears} Years
                  </span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">
                    {t("totalCreditHours")} :
                  </span>
                  <span>{selectedUser.totalCreditHours} Hours</span>
                </li>
                <li className="mb-75 d-flex justify-content-between">
                  <span className="fw-bolder me-25">
                    {t("fluencyInEnglish")} :
                  </span>
                  <span>{selectedUser.fluencyInEnglish}</span>
                </li>
              </ul>
            ) : null}
          </div>
          {user.university_id === selectedUser.university_id && (
            <div className="d-flex justify-content-center pt-2">
              <Button color="primary" onClick={() => setShow(true)}>
                {t("Edit")}
              </Button>
            </div>
          )}
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
