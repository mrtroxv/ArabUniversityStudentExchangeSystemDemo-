// ** React Imports
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Card, CardBody, Button, Toast } from "reactstrap"
import {
  acceptOffer,
  deleteOffer,
  rejectOffer
} from "../../../redux/project/offers"

const PreviewActions = ({
  id,
  setSendSidebarOpen,
  setAddStudentOpen,
  status
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handelRejectOffer = (id) => {
    toast.promise(dispatch(rejectOffer(id)), {
      loading: t("Rejecting"),
      success: t("Rejected"),
      error: t("Error")
    })
  }
  const handelDeleteOffer = (id) => {
    toast.promise(dispatch(deleteOffer(id)), {
      loading: t("Deleting"),
      success: t("Deleted"),
      error: t("Error")
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
        {status === 0 && (
          <Button
            color="primary"
            block
            className="mb-75"
            onClick={() => setSendSidebarOpen(true)}
          >
            {t("Send")}
          </Button>
        )}

        {status === 0 && (
          <Button
            tag={Link}
            to={`/offers/edit/${id}`}
            color="warning"
            block
            className="mb-75"
          >
            {t("Edit")}
          </Button>
        )}
        {status === 0 && (
          <Button
            color="danger"
            block
            className="mb-75"
            onClick={() => handelDeleteOffer(id)}
          >
            {t("Delete")}
          </Button>
        )}
        {status === 2 && (
          <Button
            color="success"
            block
            onClick={() => setAddStudentOpen(true)}
            className="mb-75"
          >
            {t("AddStudent")}
          </Button>
        )}
        {status === 1 && (
          <Button
            color="success"
            block
            onClick={() => handelAcceptOffer(id)}
            className="mb-75"
          >
            {t("Accept")}
          </Button>
        )}
        {status === 1 && (
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
