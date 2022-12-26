import React, { useEffect, useState } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap"
import { useTranslation } from "react-i18next"
import DataTable from "../../../components/custom/table/ReactTable"
// import { selectAllUniversities } from "../../../redux/project/universities"
// import { useSelector } from "react-redux"
// import DataTable from "react-data-table-component"

// import { selectAllUniversities } from "../../../redux/project/universities"
import { useForm } from "react-hook-form"
import { PlusCircle } from "react-feather"
import NewUser from "../create-user/index"
import useCols from "./useCols"
import useUniversityApi from "../../../utility/hooks/custom/useUniversityApi"
import Spinner from "../../../components/custom/loader/Spinner"

const ViewUsers = () => {
  const { register, watch, setValue } = useForm()
  const [filteredData, setFilteredData] = useState([])
  const [formModal, setFormModal] = useState(false)
  const { t } = useTranslation()
  const { cols } = useCols()
  // use selector to select universities
  //   const universities = useSelector(selectAllUniversities)
  const { isLoading, universities } = useUniversityApi()
  useEffect(() => {
    setFilteredData(universities)
  }, [universities])

  const name = watch("name")
  const email = watch("email")
  const phone = watch("phone")
  const filtered = filteredData.filter((item) => {
    return (
      item.EN_Name.toLowerCase().includes(name.toLowerCase()) &&
      item.email.toLowerCase().includes(email.toLowerCase()) &&
      item.phone.includes(phone)
    )
  })

  const clearData = () => {
    setFilteredData(universities)
    setValue("name", "")
    setValue("email", "")
    setValue("phone", "")
  }

  const isBlank = () => {
    return name === "" && email === "" && phone === ""
  }
  return (
    <>
      <Breadcrumbs
        title={`${t("Universities")}`}
        data={[{ title: t("list"), link: "/universities/list" }]}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardBody>
              <Row className="match-height">
                <Col lg="9" md="10">
                  <Row>
                    <Col lg="3" md="6">
                      <Label key="name">{t("University Name")} :</Label>
                      <input
                        {...register("name")}
                        placeholder="University Name"
                        type="text"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="3" md="6">
                      <Label key="email">{t("Email Address")} :</Label>
                      <input
                        {...register("email")}
                        placeholder="Email Address"
                        type="email"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="3" md="6">
                      <Label key="phone">{t("Phone Number")} :</Label>
                      <input
                        {...register("phone")}
                        placeholder="Phone Number"
                        type="number"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg="3" md="2">
                  <Row className="m-2">
                    <Col lg="6" md="6">
                      <Button outline onClick={clearData}>
                        {isBlank() ? "Filter" : "Reset"}
                      </Button>
                    </Col>
                    <Col lg="6" md="6">
                      <Button
                        color="primary"
                        onClick={() => {
                          setFormModal(!formModal)
                        }}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <DataTable data={filtered} columns={cols} />
              </>
            )}
          </Card>
        </Col>
      </Row>
      {formModal && (
        <Modal
          isOpen={formModal}
          toggle={() => setFormModal(!formModal)}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader
            toggle={() => setFormModal(!formModal)}
            className="modal-lg"
          >
            {t("createOffer")}
          </ModalHeader>
          <ModalBody>
            <NewUser
              outerSubmit={() => {}}
              type="modern-vertical"
              onClose={() => setFormModal(!formModal)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

export default ViewUsers
