// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
  Button
} from "reactstrap"
import { useTranslation } from "react-i18next"
import Timeline from "@components/timeline"
import { ChevronDown, Share2, User } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { useLang } from "../../../utility/hooks/custom/useLang"
import Spinner from "../../../components/custom/loader/Spinner"
import Avatar from "../../../@core/components/avatar"
import { getUniversityName } from "../../../utility/Utils"
import { IoFastFoodOutline, IoDocumentTextOutline } from "react-icons/io5"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { BsHouseDoor } from "react-icons/bs"
import { BiTaxi, BiMailSend } from "react-icons/bi"
import {
  HiOutlineDocumentCheck,
  HiOutlineCheck,
  HiOutlineXMark
} from "react-icons/hi2"
import moment from "moment"
import { selectUser } from "../../../redux/authentication"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { acceptOffer, rejectOffer } from "../store"
import DataTable from "react-data-table-component"
import useCols from "./useCols"
import { useEffect, useState, useContext } from "react"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { selectUniversity } from "../../users/store"
import { SocketContext } from "../../../utility/context/Socket"

const ExpandableTable = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="fw-bold">Start Date:</span> {data.train_start_date}
      </p>
      <p>
        <span className="fw-bold">End Date:</span> {data.train_end_date}
      </p>
      <p className="m-0">
        <span className="fw-bold">Description:</span> {data.train_description}
      </p>
    </div>
  )
}

const PreviewCard = ({ toggleSidebar, toggleAddStudent, toggleEditForm }) => {
  const { t } = useTranslation()
  const [lang] = useLang()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const store = useSelector((state) => state?.appOffers?.selectedOffer)
  const data = useSelector((state) => state?.appOffers?.selectedOffer?.offer)
  const creator = useSelector((state) =>
    selectUniversity(state, data.university_id_src)
  )
  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    const student = store?.student
    student ? setStudentData([student]) : setStudentData([])
  }, [store])

  const currentUser = useSelector(selectUser)
  const creatorUser = useSelector((state) => selectUser(state, data?.user_id))
  const { socket } = useContext(SocketContext)

  const handelAcceptOffer = (offer_id) => {
    toast.promise(dispatch(acceptOffer(offer_id)), {
      loading: t("Accepting"),
      success: () => {
        socket.emit("new-notification", {
          user: selectedOffer?.offer?.university_id_src,
          link: `/view-offers/${offer_id}`,
          message: `Your offer to has been accepted`,
          name: "Offer Accepted",
          type: "success",
          date: moment()
        })
        return t("Accepted")
      },
      error: t("Error")
    })
  }
  const handelRejectOffer = (id) => {
    toast.promise(dispatch(rejectOffer(id)), {
      loading: t("Rejecting"),
      success: () => {
        socket?.emit("new-notification-update", {
          user: selectedOffer?.offer?.university_id_src,
          link: `/view-offers/${id}`,
          message: `Your offer to has been rejected`,
          name: "Offer Rejected",
          type: "danger",
          date: moment(),
          update: {
            type: "offer",
            id: offer?.id
          }
        })
        navigate("/home")
        return t("Rejected")
      },
      error: t("Error")
    })
  }

  const { cols: candidateCols } = useCols(toggleEditForm)

  const firstStateForCreator = {
    title: t("The offer has been created"),
    content: t(
      "The offer is now ready to be sent, click on the send button to display the universities"
    ),
    icon: <HiOutlineDocumentCheck size={14} />,
    meta: moment(data.offer_date).format("MM/DD/YYYY"),
    customContent: (
      <Row className="d-flex jsutify-content-between">
        <Col className="d-flex align-items-center" md={9}>
          <Avatar img={creatorUser?.avatar} />
          <div className="d-flex flex-column mx-1">
            <span className="fw-bolder">{creatorUser?.name}</span>
            <span className="text-muted fw-bold">{creator?.email}</span>
          </div>
        </Col>
        {data.status === 0 && (
          <Col>
            <Button.Ripple color="primary" md={3} onClick={toggleSidebar}>
              {t("Send")}
            </Button.Ripple>
          </Col>
        )}
      </Row>
    )
  }

  const secondStateForCreator = {
    title: t("The offer was sent"),
    content: t(
      "The offer is now with the recipient university, click on the Inbox button to ask for an update"
    ),
    meta: moment(data.receive_date).format("MM/DD/YYYY"),
    icon: <User size={14} />,
    color: "success",
    customContent: (
      <Row className="d-flex jsutify-content-between">
        <Col className="d-flex align-items-center" md={10}>
          <Avatar img={store?.university?.logo} />
          <div className="d-flex flex-column mx-1">
            <span className="fw-bolder">
              {getUniversityName(store?.university, lang)}
            </span>
            <span className="text-muted fw-bold">
              {store?.university?.email}
            </span>
          </div>
        </Col>

        <Col md={2}>
          <Button.Ripple color="success">
            <BiMailSend size={16} />
          </Button.Ripple>
        </Col>
      </Row>
    )
  }

  const firstStateForReceiver = {
    title: t("The offer was received"),
    content: t("You can now accept the offer or reject it before it expires"),
    icon: <HiOutlineDocumentCheck size={14} />,
    color: "warning",
    meta: moment(data.receive_date).format("MM/DD/YYYY"),
    customContent: (
      <Row className="d-flex jsutify-content-between">
        <Col className="d-flex align-items-center" md={8}>
          <Avatar img={creator?.logo} />
          <div className="d-flex flex-column mx-1">
            <span className="fw-bolder">
              {getUniversityName(creator, lang)}
            </span>
            <span className="text-muted fw-bold">{creator?.email}</span>
          </div>
        </Col>
        {data.status === 1 && (
          <Col md={4}>
            <Row>
              <Col md={6}>
                <Button.Ripple
                  color="success"
                  md={4}
                  onClick={() => handelAcceptOffer(data.id)}
                >
                  <HiOutlineCheck size={16} />
                </Button.Ripple>
              </Col>
              <Col md={6}>
                <Button.Ripple
                  color="danger"
                  md={4}
                  onClick={() => handelRejectOffer(data.id)}
                >
                  <HiOutlineXMark size={16} />
                </Button.Ripple>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    )
  }

  const secondStateForReceiver = {
    title: t("The offer has been accepted"),
    content: t(
      "You can now add a student to the offer, just click the add student button"
    ),
    meta: moment(data.receive_date).format("MM/DD/YYYY"),
    icon: <User size={14} />,
    color: "success",
    customContent: (
      <Row className="d-flex jsutify-content-between">
        <Col className="d-flex align-items-center" md={9}>
          <Avatar img={store?.university?.logo} />
          <div className="d-flex flex-column mx-1">
            <span className="fw-bolder">
              {getUniversityName(store?.university, lang)}
            </span>
            <span className="text-muted fw-bold">
              {store?.university?.email}
            </span>
          </div>
        </Col>

        {!store?.student && (
          <Col md={3}>
            <Button.Ripple color="success" onClick={toggleAddStudent}>
              <User size={16} />
            </Button.Ripple>
          </Col>
        )}
      </Row>
    )
  }

  let basicData = []

  if (
    data.status >= 0 &&
    currentUser.university_id === data.university_id_src
  ) {
    basicData = [firstStateForCreator]
  }
  if (
    data.status >= 1 &&
    currentUser.university_id === data.university_id_src
  ) {
    basicData = [firstStateForCreator, secondStateForCreator]
  }
  if (
    data.status >= 1 &&
    currentUser.university_id === data.University_id_des
  ) {
    basicData = [firstStateForReceiver]
  }
  if (
    data.status >= 2 &&
    currentUser.university_id === data.University_id_des
  ) {
    basicData = [firstStateForReceiver, secondStateForReceiver]
  }
  return data !== null ? (
    <Card className="invoice-preview-card">
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <Row>
          <Col md={9}>
            <Row>
              <Col lg={2} md={4}>
                <img
                  src={creator?.logo}
                  alt="logo"
                  width="100%"
                  style={{
                    minWidth: "75px",
                    maxWidth: "100px"
                  }}
                  className="mb-1 mb-md-0"
                />
              </Col>
              <Col lg={8} md={8}>
                <h4 className="fw-bolder h1">
                  {getUniversityName(creator, lang)}
                </h4>
                <CardText className="mb-25 fw-bold h5">
                  {creator?.Location_O}
                </CardText>
                <CardText className="mb-0 text-muted fw-bold">
                  {creator?.email}
                </CardText>
                <CardText className="mb-0 text-muted fw-bold">
                  {creator?.phone}
                </CardText>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="">
            <div
              className="d-flex flex-column gap-2"
              style={{
                height: "100%"
              }}
            >
              <div className="justify-content-end d-flex">
                <h4>
                  {t("offer")}{" "}
                  <span className="invoice-number">#{data.id}</span>
                </h4>
              </div>
              <div>
                <div className="justify-content-end align-items-end d-flex">
                  <p className="mx-1">{t("Date Issued")}:</p>
                  <p className="fw-bold">
                    {moment(data.offer_date).format("MM/DD/YYYY")}
                  </p>
                </div>

                {data.status > 0 && (
                  <div className="justify-content-end align-items-end d-flex">
                    <p className="mx-1">{t("Recieve Date")}:</p>
                    <p className="fw-bold">
                      {moment(data.receive_date).format("MM/DD/YYYY")}
                    </p>
                  </div>
                )}
                {data.status < 2 &&
                  moment() < moment(data.receive_date).add(1, "days") && (
                    <div className="justify-content-end align-items-end d-flex">
                      <p className=" mx-1">{t("Due Date")}:</p>
                      <p className=" fw-bold">
                        {moment().add(2, "days").format("MM/DD/YYYY")}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </Col>
        </Row>
        {/* /Header */}
      </CardBody>

      <hr className="invoice-spacing" />

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0" id="requirments">
        <Row className="invoice-spacing">
          <Col className="p-0" xl="8">
            <h5 className="mb-2">{t("offerRequirment")} :</h5>

            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">{t("college")}:</p>
              <CardText className="mb-25">{data.college_name}</CardText>
            </div>

            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">{t("branch")}:</p>
              <CardText className="mb-25">{data.branch_name}</CardText>
            </div>

            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">{t("major")}:</p>
              <CardText className="mb-25">{data.major_name}</CardText>
            </div>

            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">{t("offerStartDate")}:</p>
              <CardText className="invoice-date">
                {new Date(data.train_start_date).toLocaleDateString()}
              </CardText>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">{t("offerEndDate")}:</p>
              <CardText className="invoice-date">
                {new Date(data.train_end_date).toLocaleDateString()}
              </CardText>
            </div>
          </Col>
          <Col className="p-0 mt-xl-0 mt-2" xl="4">
            <h5 className="mb-2">{t("candidateRequirment")}:</h5>
            <table>
              <tbody>
                <tr>
                  <td className="pe-1">{t("level")} :</td>
                  <td>
                    <span className="fw-bold">{t(data.stu_level)}</span>
                  </td>
                </tr>
                <tr>
                  <td className="pe-1">{t("gender")} :</td>
                  <td>
                    {" "}
                    <span className="fw-bold">{t(data.stu_sex)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}

      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className="invoice-padding pb-0">
        <Row className="d-flex justify-content-between">
          <Col
            className="mt-md-0 mt-3"
            md={6}
            order={{ md: 1, lg: 2 }}
            id="offer-timeline"
          >
            <Timeline data={basicData} className="mb-2" />
          </Col>

          <Col
            className="d-flex justify-content-end"
            md={store?.student ? "3" : "4"}
            order={{ md: 2, lg: 1 }}
            id="support"
          >
            <div
              className="d-flex flex-column gap-1"
              style={{
                width: "100%",
                maxWidth: "20rem"
              }}
            >
              <div className="d-flex justify-content-between">
                <IoDocumentTextOutline id="offer-icon" size={30} />
                <p>{t(data.train_type)}</p>
                <UncontrolledTooltip placement="top" target="offer-icon">
                  {t("offerType")}
                </UncontrolledTooltip>
              </div>
              {data.support_amount !== "null" && (
                <div className="d-flex justify-content-between">
                  <FaRegMoneyBillAlt id="salary-icon" size={30} />
                  <UncontrolledTooltip placement="top" target="salary-icon">
                    {t("trainingSupportAmount")}
                  </UncontrolledTooltip>
                  <p className="invoice-total-title">${data.support_amount}</p>
                </div>
              )}
              {data.meals_text !== "null" && (
                <div className="d-flex justify-content-between">
                  <IoFastFoodOutline id="food-icon" size={30} />
                  <p className="invoice-total-title">{data.meals_text}</p>
                  <UncontrolledTooltip placement="top" target="food-icon">
                    {t("trainingSupportFood")}
                  </UncontrolledTooltip>
                </div>
              )}
              {data.residence_text !== "null" && (
                <div className="d-flex justify-content-between">
                  <BsHouseDoor id="residence-icon" size={30} />
                  <UncontrolledTooltip placement="top" target="residence-icon">
                    {t("trainingSupportResidence")}
                  </UncontrolledTooltip>
                  <p className="invoice-total-title">{data.residence_text}</p>
                </div>
              )}
              {data.transfer_text !== "null" && data.transfer_text && (
                <div className="d-flex justify-content-between">
                  <BiTaxi id="transport-icon" size={30} />
                  <UncontrolledTooltip placement="top" target="transport-icon">
                    {t("trainingSupportTransport")}
                  </UncontrolledTooltip>
                  <p className="invoice-total-title">{data.transfer_text}</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          {store?.isLoading ? (
            <Spinner />
          ) : store?.student ? (
            <DataTable
              noHeader
              expandableRows
              expandableRowsComponent={ExpandableTable}
              expandOnRowClicked
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              columns={candidateCols}
              data={studentData}
            />
          ) : (
            ""
          )}
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className="invoice-spacing" />

      {/* Invoice Note */}
      <CardBody className="invoice-padding pt-0">
        <Row>
          <Col sm="12">
            <span className="fw-bold">Note: </span>
            <span>Notes are included in the final stage of the offer.</span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard
