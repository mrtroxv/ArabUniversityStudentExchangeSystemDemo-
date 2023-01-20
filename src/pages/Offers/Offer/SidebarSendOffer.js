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
  Input
} from "reactstrap"

// ** Third Party Components
import Select, { components } from "react-select"
import { FileText, Users, Link, Send } from "react-feather"

// ** Utils
import { selectThemeColors } from "@utils"
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
// import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import Avatar from "../../../@core/components/avatar"
import { selectUser } from "../../../redux/authentication"
import { useLang } from "../../../utility/hooks/custom/useLang"
import { getUniversityName } from "../../../utility/Utils"
import { sendOffer } from "../store"

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option key={data.id} {...props}>
      <div className="d-flex flex-wrap align-items-center">
        <Avatar className="my-0 me-1" size="sm" img={data.logo} />
        <div>{data.label}</div>
      </div>
    </components.Option>
  )
}

const SidebarSendOffer = ({ open, toggleSidebar, id }) => {
  // ** States
  const store = useSelector((state) => state.users)
  const user = useSelector(selectUser)
  const [lang] = useLang()
  const [selectedUniversity, setSelectedUniversity] = useState(-1)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setSelectedUniversity(e?.value)
  }
  const handleSubmit = () => {
    const uploadData = {
      university_id_des: selectedUniversity,
      offer_id: id
    }
    if (selectedUniversity && selectedUniversity === -1) {
      toast.error("No University selected")
    } else {
      toast
        .promise(dispatch(sendOffer(uploadData)), {
          loading: "Sending Offer",
          success: "Offer Sent Successfully",
          error: "Error Sending Offer"
        })
        .then(() => toggleSidebar())
    }
  }

  const listUniversities = store.allData?.activeUsers?.filter(
    (uni) => uni.id !== user.id
  )

  const data = [
    ...listUniversities?.map((university) => ({
      id: university.ID,
      type: "University",
      name: getUniversityName(university, lang),
      username: university.email,
      logo: university.logo
    }))
  ]

  const options = [
    ...data.map((item) => ({
      label: item.name,
      value: item.id,
      logo: item.logo
    }))
  ]
  // return (
  //   <Sidebar
  //     size="lg"
  //     open={open}
  //     title={t("SendUniversity")}
  //     headerClassName="mb-1"
  //     contentClassName="p-0"
  //     toggleSidebar={toggleSidebar}
  //   >
  //     <Form>
  //       <div className="mb-1">
  //         <Input id="id" defaultValue={`${t("offerID")} : #${id}`} disabled />
  //       </div>
  //       <div className="mb-1">
  //         <Label for="payment-method" className="form-label">
  //           {t("selectUniversity")}
  //         </Label>
  //         <Input
  //           type="select"
  //           id="payment-method"
  //           defaultValue={selectedUniversity}
  //           onChange={(e) => {
  //             setSelectedUniversity(e.target.value)
  //           }}
  //         >
  //           {universities.map((university) => (
  //             <option value={university.ID} key={university.ID}>
  //               {university.EN_Name}
  //             </option>
  //           ))}
  //         </Input>
  //       </div>

  //       <div className="d-flex flex-wrap mb-0">
  //         <Button className="me-1" color="primary" onClick={handleSubmit}>
  //           {t("Send")}
  //         </Button>
  //         <Button color="secondary" outline onClick={toggleSidebar}>
  //           {t("cancel")}
  //         </Button>
  //       </div>
  //     </Form>
  //   </Sidebar>
  // )
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
        <h1 className="text-center mb-1">Sharing Offer #{id}</h1>
        <p className="text-center">Share offer with another University</p>
        <Label
          for="addStudentSelect"
          className="form-label fw-bolder font-size font-small-4 mb-50"
        >
          Send to University
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
          onChange={handleChange}
        />
        <p className="fw-bolder pt-50 mt-2">
          {listUniversities?.length} Universities
        </p>
        <ListGroup flush className="mb-2">
          {listUniversities?.map((item) => {
            return (
              <ListGroupItem
                key={item.ID}
                className="d-flex align-items-start border-0 px-0"
              >
                <Avatar
                  className="me-75"
                  img={item.logo}
                  imgHeight={38}
                  imgWidth={38}
                />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="me-1">
                    <h5 className="mb-25">{getUniversityName(item, lang)}</h5>
                    <span>{item.email}</span>
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
              Public to {user.name} - {user.EN_Name}
            </p>
          </div>
          <Button
            className="fw-bolder"
            onClick={handleSubmit}
            outline
            color="primary"
            type="button"
          >
            <Send className="font-medium-2 me-50" />
            <span>Send </span>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default SidebarSendOffer
