// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table } from "reactstrap"
import appLogo from "@src/assets/images/logo/AARU.png"
const PreviewCard = ({ data }) => {
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
              Offer <span className="invoice-number">#{data.id}</span>
            </h4>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">Date Issued:</p>
              <p className="invoice-date">{data.date}</p>
            </div>
            <div className="invoice-date-wrapper">
              <p className="invoice-date-title">Due Date:</p>
              <p className="invoice-date">{data.offer_end_date}</p>
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
            <h6 className="mb-2">Offer Requirment :</h6>
            <h6 className="mb-25">{data.college_name}</h6>
            <CardText className="mb-25">{data.major_name}</CardText>
            <CardText className="mb-25">{data.offer_start_date}</CardText>
            <CardText className="mb-25">{data.offer_end_date}</CardText>
            <CardText className="mb-0">{data.date}</CardText>
          </Col>
          <Col className="p-0 mt-xl-0 mt-2" xl="4">
            <h6 className="mb-2">Candidate Requirment:</h6>
            <table>
              <tbody>
                <tr>
                  <td className="pe-1">Requirment :</td>
                  <td>
                    {/* <span className='fw-bold'>{data.totalDue}</span> */}
                  </td>
                </tr>
                <tr>
                  <td className="pe-1">Requirment:</td>
                  {/* <td>{data.paymentDetails.bankName}</td> */}
                </tr>
                <tr>
                  <td className="pe-1">Requirment:</td>
                  {/* <td>{data.paymentDetails.country}</td> */}
                </tr>
                <tr>
                  <td className="pe-1">Requirment:</td>
                  {/* <td>{data.paymentDetails.iban}</td> */}
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
            <CardText className="mb-0">
              <span className="fw-bold">Creator :</span>{" "}
              <span className="ms-75">Creator name</span>
            </CardText>
          </Col>
          <Col
            className="d-flex justify-content-end"
            md="6"
            order={{ md: 2, lg: 1 }}
          >
            <div className="invoice-total-wrapper">
              <div className="invoice-total-item">
                <p className="invoice-total-title">detail:</p>
                <p className="invoice-total-amount"></p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-title">detail:</p>
                <p className="invoice-total-amount"></p>
              </div>
              <div className="invoice-total-item">
                <p className="invoice-total-title">detail:</p>
                <p className="invoice-total-amount"></p>
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
