// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Table,
  Button,
  UncontrolledCollapse,
  ListGroup,
  ListGroupItem
} from "reactstrap"
import appLogo from "@src/assets/images/logo/AARU.png"
import { useTranslation } from "react-i18next"
import Timeline from "@components/timeline"
import { Fragment } from "react"
import { Share2, User } from "react-feather"
const PreviewCard = ({ data }) => {
  const { t } = useTranslation()

  const basicData = [
    {
      title: "تم انشاء العرض",
      content: "العرض الان جاهز للإرسال, اضغط على زر إرسال لإظهار الجامعات",
      meta: new Date(data.offer_date).toLocaleDateString()
      // customContent: (
      //   <div className="d-flex align-items-center">
      //     <img className="me-1" src={appLogo} alt="pdf" height="23" />
      //     <span>invoice.pdf</span>
      //   </div>
      // )
    },
    {
      title: "تم استقبال العرض",
      content: "العرض الان جاهز لإرفاق طالب, اضغط على زر إضافة طالب للإستمرار",
      meta: new Date(data.offer_date).toLocaleDateString(),
      icon: <User size={14} />,
      color: "success"
      // customContent: (
      //   <div className="d-flex align-items-center">
      //     <img className="me-1" src={appLogo} alt="pdf" height="23" />
      //     <span>invoice.pdf</span>
      //   </div>
      // )
    }
  ]
  return data !== null ? (
    <Card className="invoice-preview-card">
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
          <div>
            <div className="logo-wrapper">
              <img src={appLogo} alt="logo" height="46" width="50" />
              <h3 className="text-primary invoice-logo">Internship Manager</h3>
            </div>
            <CardText className="mb-25">{data.companyName}</CardText>
            <CardText className="mb-25">{data.companyAddress}</CardText>
            <CardText className="mb-0">{data.companyEmail}</CardText>
          </div>
          <div className="mt-md-0 mt-2">
            <h4 className="invoice-title">
              {t("offer")} <span className="invoice-number">#{data.id}</span>
            </h4>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">{t("dateIssued")}:</p>
              <p className="invoice-date">
                {new Date(data.offer_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className="invoice-spacing" />

      {/* Address and Contact */}
      <CardBody className="invoice-padding pt-0">
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
                    <span className="fw-bold">{data.stu_level}</span>
                  </td>
                </tr>
                <tr>
                  <td className="pe-1">{t("gender")} :</td>
                  <td>
                    {" "}
                    <span className="fw-bold">{data.stu_sex}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      {/* <Table responsive>
        <thead>
          <tr>
            <th className="py-1">Task description</th>
            <th className="py-1">Rate</th>
            <th className="py-1">Hours</th>
            <th className="py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1">
              <p className="card-text fw-bold mb-25">Native App Development</p>
              <p className="card-text text-nowrap">
                Developed a full stack native app using React Native, Bootstrap
                & Python
              </p>
            </td>
            <td className="py-1">
              <span className="fw-bold">$60.00</span>
            </td>
            <td className="py-1">
              <span className="fw-bold">30</span>
            </td>
            <td className="py-1">
              <span className="fw-bold">$1,800.00</span>
            </td>
          </tr>
          <tr className="border-bottom">
            <td className="py-1">
              <p className="card-text fw-bold mb-25">Ui Kit Design</p>
              <p className="card-text text-nowrap">
                Designed a UI kit for native app using Sketch, Figma & Adobe XD
              </p>
            </td>
            <td className="py-1">
              <span className="fw-bold">$60.00</span>
            </td>
            <td className="py-1">
              <span className="fw-bold">20</span>
            </td>
            <td className="py-1">
              <span className="fw-bold">$1200.00</span>
            </td>
          </tr>
        </tbody>
      </Table> */}
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className="invoice-padding pb-0">
        <Row className="invoice-sales-total-wrapper">
          <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}>
            <Timeline data={basicData} />
          </Col>

          <Col
            className="d-flex justify-content-end"
            md="4"
            order={{ md: 2, lg: 1 }}
          >
            <div className="invoice-total-wrapper">
              <div className="invoice-total-item">
                <p className="invoice-total-amount">{t("offerOwner")}:</p>
                <p className="invoice-total-title">Creator</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-amount">{t("offerType")}:</p>
                <p className="invoice-total-title">{data.train_type}</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-amount">
                  {t("trainingSupportAmount")}:
                </p>
                <p className="invoice-total-title">{data.support_amount}</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-amount">
                  {t("trainingSupportFood")}:
                </p>
                <p className="invoice-total-title">{data.food_text}</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-amount">
                  {t("trainingSupportResidence")}:
                </p>
                <p className="invoice-total-title">{data.residence_text}</p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-amount">
                  {t("trainingSupportTransfer")}:
                </p>
                <p className="invoice-total-title">{data.transfer_text}</p>
              </div>
            </div>
          </Col>
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
