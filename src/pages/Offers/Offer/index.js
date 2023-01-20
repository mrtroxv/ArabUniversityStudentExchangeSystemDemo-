// ** React Imports
import { useParams, Link } from "react-router-dom"

// ** Reactstrap Imports
import {
  Row,
  Col,
  Alert,
  Card,
  ModalHeader,
  Modal,
  ModalBody
} from "reactstrap"

// ** Styles
import "@styles/base/pages/app-invoice.scss"
import { useDispatch, useSelector } from "react-redux"
import PreviewCard from "./PreviewCard"
import PreviewActions from "./PreviewActions"
import SidebarAddStudent from "./SidebarAddStudent"
import SidebarSendOffer from "./SidebarSendOffer"
import { useEffect, useState } from "react"
import RecieverPreview from "./RecieverPreview"
import { editOffer, getOffer } from "../store"
import OfferWizard from "../create-offer/OfferWizard"
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import { selectUser } from "../../../redux/authentication"
import EditRequest from "./EditRequest"
import Spinner from "../../../components/custom/loader/Spinner"
import { selectUniversity } from "../../users/store"

const OfferPreview = () => {
  // ** HooksVars
  const { id } = useParams()
  const { t } = useTranslation()
  const store = useSelector((state) => state.appOffers)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addStudent, setAddStudent] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [editRequest, setEditRequest] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const defaultData = store.selectedOffer.offer || {}

  const recepient = useSelector((state) =>
    selectUniversity(state, user.university_id)
  )
  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddStudent(!addStudent)
  const toggleDeletePopup = () => setDeletePopup(!deletePopup)
  const toggleEditForm = () => setEditForm(!editForm)
  const toggleEditRequest = () => setEditRequest(!editRequest)

  useEffect(() => {
    dispatch(getOffer(id))
  }, [
    dispatch,
    id,
    !store.selectedOffer?.offer,
    !store.selectedOffer?.university
  ])

  const handleEditOffer = (data) => {
    toast.promise(dispatch(editOffer(data)), {
      loading: t("Updating"),
      success: () => {
        dispatch(getOffer(id))
        setEditForm(false)
        return t("Updated")
      },
      error: t("Error")
    })
  }

  const university =
    store.selectedOffer?.offer?.University_id_des &&
    store.selectedOffer.university

  return store.selectedOffer?.offer !== null &&
    store.selectedOffer?.offer?.id !== undefined ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={9} md={8} sm={12}>
          <Card>
            <PreviewCard
              data={store.selectedOffer.offer}
              toggleSidebar={toggleSendSidebar}
              toggleAddStudent={toggleAddSidebar}
              toggleEditForm={toggleEditRequest}
            />
          </Card>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <Card>
            <PreviewActions
              id={id}
              data={store.selectedOffer?.offer}
              setAddStudentOpen={toggleAddSidebar}
              setSendSidebarOpen={toggleSendSidebar}
              setEditOfferOpen={toggleEditForm}
              deletePopup={toggleDeletePopup}
              toggleEditForm={toggleEditRequest}
            />
          </Card>
          {university && (
            <Card>
              <RecieverPreview
                data={university}
                status={store.selectedOffer?.offer?.status}
              />
            </Card>
          )}
          <Card></Card>
        </Col>
      </Row>
      <SidebarSendOffer
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen}
        id={id}
      />
      <SidebarAddStudent
        toggleSidebar={toggleAddSidebar}
        creator={recepient}
        open={addStudent}
        id={id}
      />
      {editForm && (
        <Modal
          isOpen={editForm}
          toggle={toggleEditForm}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={toggleEditForm} className="modal-lg">
            {t("Edit Offer")}
          </ModalHeader>
          <ModalBody>
            <OfferWizard
              outerSubmit={handleEditOffer}
              type="modern-vertical"
              onClose={toggleEditForm}
              initialData={defaultData}
            />
          </ModalBody>
        </Modal>
      )}
      {editRequest && (
        <Modal
          isOpen={editRequest}
          toggle={toggleEditRequest}
          className="modal-dialog-centered modal-md"
        >
          <ModalHeader toggle={toggleEditRequest} className="modal-md">
            {t("Edit Request")}
          </ModalHeader>
          <ModalBody>
            <EditRequest
              request={store.selectedOffer?.student}
              toggle={toggleEditRequest}
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  ) : store.isLoading ? (
    <Spinner />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Offer not found</h4>
      <div className="alert-body">
        Offer with id: {id} doesn't exist. Check list of all offers:{" "}
        <Link to="/home">Offer List</Link>
      </div>
    </Alert>
  )
}

export default OfferPreview
