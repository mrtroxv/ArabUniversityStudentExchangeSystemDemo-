// ** React Imports
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

// ** Reactstrap Imports
import { Card, CardBody, Button, Toast } from "reactstrap"
import { deleteOffer } from "../../../redux/project/offers"
import ShareProjectExample from "../../../views/pages/modal-examples/ShareProject"
import { acceptOffer, rejectOffer } from "../store"
import { selectUser } from "../../../redux/authentication"

const MySwal = withReactContent(Swal)

const PreviewActions = ({
  id,
  setSendSidebarOpen,
  setAddStudentOpen,
  setEditOfferOpen,
  data
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = data?.status
  const user = useSelector(selectUser)
  console.log(data)
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

  return (
    <Card className="invoice-action-wrapper">
      <CardBody>
        {/* <ShareProjectExample /> */}
        {status === 0 && user.university_id === data.university_id_src && (
          <Button
            color="primary"
            block
            className="mb-75"
            onClick={setSendSidebarOpen}
          >
            {t("Send")}
          </Button>
        )}

        {status < 5 && user.university_id === data.university_id_src && (
          <Button
            color="warning"
            block
            className="mb-75"
            onClick={setEditOfferOpen}
          >
            {t("Edit")}
          </Button>
        )}
        {status === 0 && user.university_id === data.university_id_src && (
          <Button
            color="danger"
            block
            className="mb-75"
            onClick={() => handelDeleteOffer(id)}
          >
            {t("Delete")}
          </Button>
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
        {status === 1 && user.university_id !== data.university_id_src && (
          <Button
            color="success"
            block
            onClick={() => handelAcceptOffer(id)}
            className="mb-75"
          >
            {t("Accept")}
          </Button>
        )}
        {status === 1 && user.university_id !== data.university_id_src && (
          <Button
            color="danger"
            block
            onClick={() => handelRejectOffer(id)}
            className="mb-75"
          >
            {t("Reject")}
          </Button>
        )}
        <Button color="success" block outline className="mb-75">
          {t("Print")}
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
