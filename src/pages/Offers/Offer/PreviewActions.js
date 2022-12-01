// ** React Imports
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

// ** Reactstrap Imports
import { Card, CardBody, Button, Toast } from "reactstrap"
import {
  acceptOffer,
  deleteOffer,
  fetchAllOffers,
  rejectOffer,
  resetDeleteOfferState,
  selectAcceptOfferState,
  selectDeleteOfferState,
  selectRejectOfferState
} from "../../../redux/project/offers"

const PreviewActions = ({
  id,
  setSendSidebarOpen,
  setAddStudentOpen,
  status
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rejectOfferState = useSelector(selectRejectOfferState)
  const deleteOfferState = useSelector(selectDeleteOfferState)
  const acceptOfferState = useSelector(selectAcceptOfferState)

  const handelRejectOffer = (id) => {
    dispatch(rejectOffer(id))
  }
  const handelDeleteOffer = (id) => {
    dispatch(deleteOffer(id))
  }
  const handelAcceptOffer = (offer_id) => {
    dispatch(acceptOffer(offer_id))
  }

  useEffect(() => {
    if (rejectOfferState.status) {
      dispatch(fetchAllOffers())
    }
    if (deleteOfferState.status) {
      dispatch(fetchAllOffers())
      dispatch(resetDeleteOfferState())
      navigate(-1)
    }
    if (acceptOfferState.status) {
      dispatch(fetchAllOffers())
    }
  }, [rejectOfferState.status, deleteOfferState.status, acceptOfferState.status])

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
        <Button
          color="success"
          tag={Link}
          to="/offers/print"
          target="_blank"
          block
          outline
          className="mb-75"
        >
          {t("Print")}
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
