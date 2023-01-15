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
import { Search, Inbox, Camera } from "react-feather"
const RecieverPreview = ({ data, status }) => {
  const { t } = useTranslation()
  const [lang] = useLang()

  const statusBadge = {
    0: { title: t("Creating Offer"), color: "light-primary" },
    1: { title: t("Pending Request"), color: "light-warning" },
    2: { title: t("Accepted"), color: "light-info" },
    3: { title: t("Ready to Start"), color: "light-success" },
    4: { title: t("Offer Report"), color: "light-primary" },
    5: { title: t("Finished"), color: "light-danger" }
  }
  const name = lang === "ar" ? data.AR_Name : data.EN_Name

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="mb-1">{t("University")}</CardTitle>
        <CardSubtitle>{t("Data of The Recipent University")}</CardSubtitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-start border-0 px-0 mb-1">
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
          <div></div>
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
