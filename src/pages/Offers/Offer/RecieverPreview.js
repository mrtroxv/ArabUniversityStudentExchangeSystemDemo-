// ** React Imports
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  Button,
  Toast,
  Badge,
  CardHeader,
  CardTitle,
  CardSubtitle
} from "reactstrap"
import Avatar from "../../../@core/components/avatar"
import { useLang } from "../../../utility/hooks/custom/useLang"
import FormHeader from "../../users/create-user/new-user-form/FormHeader"
import { Inbox } from "react-feather"
import { getUniversityName } from "../../../utility/Utils"
import useStatusBadge from "../../../utility/hooks/custom/useStatusBadge"

const RecieverPreview = ({ data, status }) => {
  const { t } = useTranslation()
  const [lang] = useLang()
  const { statusBadge } = useStatusBadge()

  const name = lang === "ar" ? data.AR_Name : data.EN_Name

  return (
    <Card className="overflow-hidden">
      <CardHeader className="d-flex flex-column align-items-start border-bottom mb-1">
        <CardTitle className="mb-1 fw-bold">{t("University")}</CardTitle>
        <CardSubtitle>{t("Data of The Recipent University")}</CardSubtitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-start border-0 px-0 mb-2 mt-1">
          <Avatar
            img={data.logo}
            imgHeight={38}
            imgWidth={38}
            className="me-75"
          />
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="me-1">
              <h5 className="mb-25">
                <Link to={`/universities/profile/${data.ID}`}>{name}</Link>
              </h5>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex flex-column">
            <span>{data.phone}</span>
            <a href={data.url} className="text-muted mb-1">
              {getUniversityName(data, lang)}
            </a>
          </div>
          <Button.Ripple className="btn-icon" outline color="primary">
            <Inbox size={16} />
          </Button.Ripple>
        </div>
        <Badge color={statusBadge[status].color} pill>
          {statusBadge[status].title}
        </Badge>
      </CardBody>
    </Card>
  )
}

export default RecieverPreview
