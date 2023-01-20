// ** Reactstrap Imports
import { Card, CardHeader, Col, Progress, Row } from "reactstrap"

// ** Third Party Components
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
// ** Custom Components
import Avatar from "@components/avatar"

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { useColumns } from "./columns"
import { useSelector } from "react-redux"

import Spinner from "../../../components/custom/loader/Spinner"
import { useTranslation } from "react-i18next"
import moment from "moment"

const ExpandableTable = ({ data }) => {
  const { t } = useTranslation()
  // const university = useSelector
  return (
    <Card className="expandable-content d-flex px-2 pt-2">
      <Row>
        <Col md={6} className="d-flex flex-column gap-75">
          <Row>
            <Col md={3}>
              <span className="fw-bold">{t("trainingStartDate")}:</span>
            </Col>
            <Col md={9}>
              <span>{moment(data.train_start_date).format("MMM d, YYYY")}</span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <span className="fw-bold">{t("trainingEndDate")}:</span>
            </Col>
            <Col md={9}>
              <span>{moment(data.train_end_date).format("MMM d, YYYY")}</span>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <span className="fw-bold">{t("trainingDescription")}:</span>
            </Col>
            <Col md={9}>
              <span className="text-wrap">{data.train_description}</span>
            </Col>
          </Row>
        </Col>
        <Col md={6} className="d-flex flex-column gap-75">
          <Row>
            <Col md={6}>
              <span className="fw-bold">{t("instituteDaysOfWork")}:</span>
            </Col>
            <Col md={6}>
              <span>{data.days_of_work}</span>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <span className="fw-bold">{t("instituteDailyHours")}:</span>
            </Col>
            <Col md={6}>
              <span>{data.daily_hours}</span>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <span className="fw-bold">{t("instituteWeeklyHours")}:</span>
            </Col>
            <Col md={6}>
              <span>{data.weekly_hours}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

const UserProjectsList = () => {
  const { cols } = useColumns()
  const store = useSelector((state) => state.candidates)
  const { t } = useTranslation()
  const offer = store.selectedUser?.offer ? [store.selectedUser.offer] : []
  return (
    <Card>
      <CardHeader tag="h4">{t("Assigned Offer")}</CardHeader>

      <div className="react-dataTable user-view-account-projects">
        {store.isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            noHeader
            expandableRows
            columns={cols}
            data={offer}
            expandOnRowClicked
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            expandableRowsComponent={ExpandableTable}
          />
        )}
      </div>
    </Card>
  )
}

export default UserProjectsList
