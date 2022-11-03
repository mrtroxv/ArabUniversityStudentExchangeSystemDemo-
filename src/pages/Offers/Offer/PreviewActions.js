// ** React Imports
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap"

const PreviewActions = ({
  id,
  setSendSidebarOpen,
  setAddStudentOpen,
  status
}) => {
  const { t } = useTranslation()
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
        <Button
          color="secondary"
          tag={Link}
          to="/offers/print"
          target="_blank"
          block
          outline
          className="mb-75"
        >
          {t("Print")}
        </Button>
        {status === 0 && (
          <Button
            tag={Link}
            to={`/offers/edit/${id}`}
            color="secondary"
            block
            outline
            className="mb-75"
          >
            {t("Edit")}
          </Button>
        )}
        {status === 1 && (
          <Button color="success" block onClick={() => setAddStudentOpen(true)}>
            {t("AddStudent")}
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default PreviewActions
