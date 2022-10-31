import React from "react"
import Breadcrumbs from "@components/breadcrumbs"
import { Row, Col, Card, CardTitle, CardBody, CardHeader } from "reactstrap"
import { useTranslation } from "react-i18next"
import Table from "../../../components/custom/table/ReactTable"

const ViewUsers = () => {
  const { t } = useTranslation()
  // use selector to select universities
  const universities = []

  return (
    <>
      <Breadcrumbs
        title={`${t("universities")}`}
        data={[{ title: t("list"), link: "/universities/list" }]}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>SS</CardHeader>
            <CardBody>
              <CardTitle>Filters</CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table data={universities} cols={[]} />
        </Col>
      </Row>
    </>
  )
}

export default ViewUsers
