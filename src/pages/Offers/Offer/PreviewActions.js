// ** React Imports
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

// ** Reactstrap Imports
import { Card, CardBody, Button, Toast, UncontrolledTooltip } from "reactstrap"
import { deleteOffer } from "../../../redux/project/offers"
import ShareProjectExample from "../../../views/pages/modal-examples/ShareProject"
import {
  acceptOffer,
  acceptRequest,
  flushSelectedOffer,
  rejectOffer,
  rejectSubmission,
  removeStudent,
  submitRequest
} from "../store"
import { selectUser } from "../../../redux/authentication"
import moment from "moment"

const MySwal = withReactContent(Swal)

const PreviewActions = ({
  id,
  setSendSidebarOpen,
  setAddStudentOpen,
  setEditOfferOpen,
  toggleEditForm,
  data
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = data?.status
  const user = useSelector(selectUser)
  const store = useSelector((state) => state.appOffers.selectedOffer)
  const handelRejectOffer = (id) => {
    toast.promise(dispatch(rejectOffer(id)), {
      loading: t("Rejecting"),
      success: () => {
        navigate(-1)
        return t("Rejected")
      },
      error: t("Error")
    })
  }
  const handleRejectRequest = (id) => {
    toast.promise(dispatch(rejectSubmission(id)), {
      loading: t("Rejecting"),
      success: () => {
        return t("Rejected")
      },
      error: t("Error")
    })
  }
  const handelDeleteOffer = (id) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete Offer!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1"
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Offer has been deleted.",
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
          .then(() =>
            toast.promise(dispatch(deleteOffer(id)), {
              loading: t("Deleting"),
              success: t("Deleted"),
              error: t("Error")
            })
          )
          .then(() => navigate(-1))
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Deletion :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
      }
    })
  }
  const handelAcceptOffer = (offer_id) => {
    toast.promise(dispatch(acceptOffer(offer_id)), {
      loading: t("Accepting"),
      success: t("Accepted"),
      error: t("Error")
    })
  }
  const handleSubmitRequest = () => {
    toast.promise(
      dispatch(
        submitRequest({
          offer_id: store.offer.id
        })
      ),
      {
        loading: t("Submitting"),
        success: t("Submitted"),
        error: t("Error")
      }
    )
  }

  const handleAcceptRequest = () => {
    toast.promise(
      dispatch(
        acceptRequest({
          offer_id: store.offer.id
        })
      ),
      {
        loading: t("Accepting"),
        success: t("Accepted"),
        error: t("Error")
      }
    )
  }

  const handleRemoveStudent = () => {
    dispatch(flushSelectedOffer())
    toast.promise(
      dispatch(
        removeStudent({
          offer_id: store.offer.id,
          student_id: store.student.ID
        })
      ),
      {
        loading: t("Removing"),
        success: t("Removed"),
        error: t("Error")
      }
    )
  }

  return (
    <Card>
      <CardBody>
        {/* <ShareProjectExample /> */}
        {status === 0 && user.university_id === data.university_id_src && (
          <>
            <Button
              color="primary"
              block
              className="mb-75"
              onClick={setSendSidebarOpen}
            >
              {t("Send")}
            </Button>
            <Button
              color="danger"
              block
              className="mb-75"
              onClick={() => handelDeleteOffer(id)}
            >
              {t("Delete")}
            </Button>
          </>
        )}
        {status === 1 && user.university_id !== data.university_id_src && (
          <>
            <Button
              color="success"
              block
              onClick={() => handelAcceptOffer(id)}
              className="mb-75"
            >
              {t("Accept")}
            </Button>
            <Button
              color="danger"
              block
              onClick={() => handelRejectOffer(id)}
              className="mb-75"
            >
              {t("Reject")}
            </Button>
          </>
        )}
        {status === 2 && user.university_id !== data.university_id_src && (
          <Button
            color="success"
            block
            onClick={setAddStudentOpen}
            className="mb-75"
          >
            {t("AddStudent")}
          </Button>
        )}
        {status === 3 && user.university_id !== data.university_id_src && (
          <>
            {!store.student.status && (
              <UncontrolledTooltip placement="top" target="student-state">
                {t("You must complete your request")}
              </UncontrolledTooltip>
            )}
            <Button
              color={store.student?.status ? "success" : "secondary"}
              block
              onClick={() => {
                if (store.student?.status) handleSubmitRequest(id)
              }}
              className="mb-75"
              id="student-state"
            >
              {t("Submit Request")}
            </Button>
            <Button
              color="warning"
              block
              onClick={toggleEditForm}
              className="mb-75"
            >
              {t("Edit Request")}
            </Button>
            <Button
              color="danger"
              block
              onClick={handleRemoveStudent}
              className="mb-75"
            >
              {t("Remove Student")}
            </Button>
          </>
        )}
        {status === 4 && user.university_id === data.university_id_src && (
          <>
            <Button
              color="success"
              block
              onClick={() => handleAcceptRequest()}
              className="mb-75"
            >
              {t("Accept Submission")}
            </Button>
            <Button
              color="danger"
              block
              onClick={() => handleRejectRequest(id)}
              className="mb-75"
            >
              {t("Reject Submission")}
            </Button>
          </>
        )}
        {status === 5 && (
          <Button
            color="warning"
            block
            onClick={() => {}}
            className="mb-75"
            disabled={true}
          >
            {t("Starts in ")} {moment(data.train_start_date).fromNow()}
          </Button>
        )}
        {status < 6 && user.university_id === data.university_id_src && (
          <Button
            color="warning"
            block
            className="mb-75"
            onClick={setEditOfferOpen}
          >
            {t("Edit")}
          </Button>
        )}
        {status === 6 && (
          <Button
            color="warning"
            block
            onClick={() => {}}
            className="mb-75"
            disabled={true}
          >
            {t("Waiting for training to Finish")}
          </Button>
        )}
        {status === 7 && user.university_id === data.university_id_src && (
          <Button
            color="success"
            block
            onClick={() => {
              if (!store.universityReport) {
                console.log("University Report is not ready")
              }
              // else setUniversityReportOpen(true)
            }}
            className="mb-75"
          >
            {t("Evaluate Student")}
          </Button>
        )}
        {status === 7 && user.university_id !== data.university_id_src && (
          <Button
            color={store.universityReport ? "success" : "warning"}
            block
            onClick={() => {
              if (!store.studentReport && store.universityReport) {
                console.log("Student Report is not ready")
              }
              // else setStudentReportOpen(true)
            }}
            disabled={!store.universityReport}
            className="mb-75"
          >
            {store.universityReport
              ? t("Evaluate Training")
              : t("Waiting for University Evaluation")}
          </Button>
        )}

        <Button color="success" block outline>
          {t("Print")}
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
