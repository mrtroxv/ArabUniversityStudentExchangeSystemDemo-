// ** Custom Components
import Avatar from "@components/avatar"
import Timeline from "@components/timeline"

// ** Images
import moment from "moment"
import { ArrowRightCircle, User } from "react-feather"
import { useTranslation } from "react-i18next"
import { HiOutlineDocumentCheck, HiOutlineDocumentPlus } from "react-icons/hi2"
import { useSelector } from "react-redux"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardText
} from "reactstrap"
import SpinnerComponent from "../../../@core/components/spinner/Fallback-spinner"
import { useLang } from "../../../utility/hooks/custom/useLang"
import { getUniversityName } from "../../../utility/Utils"
import { selectUniversity } from "../../users/store"

const UserTimeline = () => {
  const { t } = useTranslation()
  const [lang] = useLang()
  const store = useSelector((state) => state.candidates)
  const selectedOffer = useSelector((state) => state.appOffers.selectedOffer)
  const candidate = store.selectedUser.student
  const offer = store.selectedUser.offer

  if (store.isLoading) return <SpinnerComponent />

  const request = store.requestsData.find(
    (r) => r.offer_id === offer.id && r.student_id === candidate.ID
  )
  const recipient = useSelector((state) =>
    selectUniversity(state, offer.University_id_des)
  )
  const sender = useSelector((state) =>
    selectUniversity(state, offer.university_id_src)
  )

  const assignState = {
    title: t("Assigned to an Offer"),
    content: t("This student has been assigned to an offer"),
    icon: <User size={14} />,
    meta: moment(request.assignDate).format("MM/DD/YYYY")
  }

  const acceptState = {
    title: t("Updated offer request"),
    content: t("This student has updated his offer request"),
    meta: moment(request.submitDate).format("MM/DD/YYYY"),
    color: "success",
    icon: <HiOutlineDocumentCheck size={14} />
  }

  const universityEvaluation = {
    title: t("University Evaluation"),
    content: t("This student has been evaluated by the university"),
    meta: moment(selectedOffer?.universityReport?.issueDate).format(
      "MM/DD/YYYY"
    ),
    color: "warning",
    icon: <HiOutlineDocumentPlus size={14} />,
    customContent: (
      <Row>
        <div className="d-flex align-items-center">
          <Avatar img={sender?.logo} imgHeight={38} imgWidth={38} />
          <div className="ms-50">
            <h6 className="mb-0">{getUniversityName(sender, lang)}</h6>
            <span className="text-muted fw-bold">{sender.email}</span>
          </div>
        </div>
      </Row>
    )
  }

  const studentEvaluation = {
    title: t("Student Evaluation"),
    content: t("This student has evaluted the offer"),
    meta: moment(selectedOffer?.studentReport?.issueDate).format("MM/DD/YYYY"),
    color: "info",
    icon: <HiOutlineDocumentPlus size={14} />,
    customContent: (
      <Row>
        <div className="d-flex align-items-center ">
          <Avatar img={recipient?.logo} imgHeight={38} imgWidth={38} />
          <div className="ms-50">
            <h6 className="mb-0">{getUniversityName(recipient, lang)}</h6>
            <span className="text-muted fw-bold">{recipient.email}</span>
          </div>
        </div>
      </Row>
    )
  }

  const data = []
  if (offer.status >= 1) data.push(assignState)
  if (offer.status >= 2) data.push(acceptState)
  if (offer.status === 7 && selectedOffer?.universityReport) {
    data.push(universityEvaluation)
  }
  if (offer.status === 7 && selectedOffer?.studentReport) {
    data.push(studentEvaluation)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{t("Student Activity Timeline")}</CardTitle>
      </CardHeader>
      <CardBody className="pt-1">
        <Timeline data={data} className="ms-50" />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
