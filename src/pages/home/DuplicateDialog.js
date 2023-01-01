// useSelector
// import { useDispatch, useSelector } from "react-redux"
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Label,
  Input
} from "reactstrap"

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import { useTranslation } from "react-i18next"
// import toast from "react-hot-toast"

const DuplicateDialog = ({ open, toggleModal, id }) => {
  // ** States
  const { t } = useTranslation()
  console.log(id)
  // const dispatch = useDispatch()

  // const handleSubmit = () => {
  //   const uploadData = {
  //     university_id_des: selectedUniversity,
  //     offer_id: id
  //   }
  //   toast.promise(dispatch(sendOffer(uploadData)), {
  //     loading: "Sending Offer",
  //     success: "Offer Sent Successfully",
  //     error: "Error Sending Offer"
  //   })

  //   toggleSidebar()
  // }

  return (
    <Modal
      isOpen={open}
      toggle={toggleModal}
      className="modal-dialog-centered modal-sm"
    >
      <ModalHeader toggle={toggleModal} className="modal-sm">
        {t("Duplicate Offer")}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="12">
            <Label for="duplicate-offer" className="form-label">
              {t("Chose a Number")}
            </Label>
            <Input
              type="number"
              id="duplicate-offer"
              defaultValue=""
              onChange={(e) => {
                console.log(e.value)
              }}
            />
          </Col>
        </Row>
        <Row></Row>
      </ModalBody>
    </Modal>
  )
}

export default DuplicateDialog
