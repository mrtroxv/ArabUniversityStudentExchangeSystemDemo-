// ** React Imports
import { useState } from "react"
// ** Third Party Components
import Flatpickr from "react-flatpickr"
//useSelector
import { useDispatch, useSelector } from "react-redux"
// ** Reactstrap Imports

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Reactstrap Imports
import {
  Card,
  Button,
  Label,
  Modal,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  Badge
} from "reactstrap"

// ** Third Party Components
import Select, { components } from "react-select"
import { FileText, Users, X, Check } from "react-feather"

// ** Utils
import { selectThemeColors } from "@utils"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useTranslation } from "react-i18next"
// import { addStudent } from "../../../redux/project/offers"
import toast from "react-hot-toast"
import { selectUser } from "../../../redux/authentication"
import Avatar from "../../../@core/components/avatar"
import { getUniversityName } from "../../../utility/Utils"
import { useLang } from "../../../utility/hooks/custom/useLang"
import { addStudent } from "../store"
import { Link } from "react-router-dom"

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option key={data.id} {...props}>
      <div className="d-flex flex-wrap align-items-center">
        <Avatar className="my-0 me-1" size="sm" img={data.avatar} />
        <div>{data.label}</div>
      </div>
    </components.Option>
  )
}

const SidebarAddStudent = ({ creator, open, toggleSidebar, id }) => {
  // ** States
  const { t } = useTranslation()
  const students = useSelector((state) => state.candidates)
  const requests = useSelector((state) => state.candidates.requestsData)
  const [student_id, setStudent_id] = useState(-1)
  const dispatch = useDispatch()
  const [lang] = useLang()
  const user = useSelector(selectUser)
  const handelAddStudent = () => {
    if (student_id === -1) {
      toast.error(t("msg.noStudentSelected"))
    } else {
      toast.promise(dispatch(addStudent({ offer_id: id, student_id })), {
        loading: "Adding Student",
        success: "Student Added Successfully",
        error: "Error Adding Student"
      })
      toggleSidebar()
    }
  }

  const handelSelectStudent = (e) => {
    setStudent_id(e?.value)
  }

  const data = [
    ...students.allData?.map((student) => ({
      id: student.ID,
      type: "Student",
      name: student.name,
      username: student.email,
      logo: creator.logo
    }))
  ]

  const requestsIds = requests?.map((request) => request.student_id)
  const options = [
    ...data
      .map((item) => ({
        label: item.name,
        value: item.id,
        avatar: item.logo
      }))
      .filter((item) => !requestsIds.includes(item.value))
  ]

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader
        className="bg-transparent"
        toggle={toggleSidebar}
      ></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-4">
        <h1 className="text-center mb-1">
          {t("Share Offer")} #{id}
        </h1>
        <p className="text-center">{t("Share offer with another Student")}</p>
        <Label
          for="addStudentSelect"
          className="form-label fw-bolder font-size font-small-4 mb-50"
        >
          Add Student
        </Label>
        <Select
          options={options}
          isClearable={false}
          id="addStudentSelect"
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          components={{
            Option: OptionComponent
          }}
          onChange={handelSelectStudent}
        />
        <p className="fw-bolder pt-50 mt-2">
          {students.allData?.length} {t("Students")}
        </p>
        <ListGroup flush className="mb-2">
          {students.allData.map((item) => {
            return (
              <ListGroupItem
                key={item.ID}
                className="d-flex align-items-start border-0 px-0"
              >
                <Avatar
                  className="me-75"
                  img={user.logo}
                  imgHeight={38}
                  imgWidth={38}
                />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="me-1">
                    <h5 className="mb-25">{item.name}</h5>
                    <span>{item.email}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    {requestsIds.includes(item.ID) && (
                      <Link
                        to={`/view-offers/${
                          requests.find((r) => r.student_id === item.ID)
                            .offer_id
                        }`}
                        target="_blank"
                      >
                        <Button.Ripple
                          className="btn-icon"
                          color="danger"
                          outline
                        >
                          <X size={14} className="mx-2" />
                          {t("Requested")}
                        </Button.Ripple>
                      </Link>
                    )}
                    {!requestsIds.includes(item.ID) && (
                      <Button.Ripple
                        className="btn-icon"
                        color="success"
                        outline
                      >
                        <Check size={14} className="mx-2" />
                        {t("Available")}
                      </Button.Ripple>
                    )}
                  </div>
                </div>
              </ListGroupItem>
            )
          })}
        </ListGroup>
        <div className="d-flex align-content-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center me-2">
            <Users className="font-medium-2 me-50" />
            <p className="fw-bolder mb-0">
              {t("Public to")} {user.name} - {getUniversityName(user, lang)}
            </p>
          </div>
          <Button
            className="fw-bolder"
            onClick={handelAddStudent}
            outline
            color="primary"
            type="button"
          >
            <Link className="font-medium-2 me-50" />
            <span>{t("Add")} </span>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default SidebarAddStudent
