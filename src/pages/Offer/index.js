// ** React Imports
import { useParams, Link } from "react-router-dom"

// ** Reactstrap Imports
import { Row, Col, Alert, Card } from "reactstrap"

// ** Styles
import "@styles/base/pages/app-invoice.scss"
import { useSelector } from "react-redux"
import { selectOfferById } from "../../redux/project/offers"
import PreviewCard from "./PreviewCard"
const OfferPreview = () => {
  // ** HooksVars
  const { id } = useParams()
  const offer = useSelector((state) => selectOfferById(state, id))
  const data = offer

  return data !== null && data.id !== undefined ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={9} md={8} sm={12}>
          <Card>
            <PreviewCard data={data} />
          </Card>
        </Col>
        <Col xl={3} md={4} sm={12}>
          <Card>
            <h1>Offer Actions</h1>
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Offer not found</h4>
      <div className="alert-body">
        Offer with id: {id} doesn't exist. Check list of all offers:{" "}
        <Link to="/home">Offer List</Link>
      </div>
    </Alert>
  )
}

export default OfferPreview
