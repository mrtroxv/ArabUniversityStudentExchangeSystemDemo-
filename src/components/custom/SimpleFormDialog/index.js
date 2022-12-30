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

const SimpleFormDialog = ({ open, toggleModal, handleSubmit, children }) => {
  // ** States
  const { t } = useTranslation()
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
        <Col>
          <Row className="mb-2">{children}</Row>
          <div className="d-flex justify-content-end gap-1">
            <Button color="secondary" outline onClick={toggleModal}>
              {t("Cancel")}
            </Button>
            <Button color="success" onClick={handleSubmit}>
              {t("Submit")}
            </Button>
          </div>
        </Col>
      </ModalBody>
    </Modal>
  )
}

export default SimpleFormDialog
