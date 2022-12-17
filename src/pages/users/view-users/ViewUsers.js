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
import { useSelector } from "react-redux"
// import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import { selectAllUniversities } from "../../../redux/project/universities"
import { useForm } from "react-hook-form"

import NewUser from "../create-user/index"

const ViewUsers = () => {
  const { register, watch, setValue } = useForm()
  const [filteredData, setFilteredData] = useState([])
  const [formModal, setFormModal] = useState(false)
  const { t } = useTranslation()
  // use selector to select universities
  //   const universities = useSelector(selectAllUniversities)
  const universities = useSelector(selectAllUniversities)
  useEffect(() => {
    setFilteredData(universities)
  }, [universities])

  const cols = [
    {
      name: "ID",
      sortable: true,
      maxWidth: "25px",
      selector: (row) => row.ID
    },
    {
      name: "Name",
      sortable: true,
      minWidth: "100px",
      selector: (row) => row.EN_Name
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.email
    },
    {
      name: "Phone Number",
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.phone
    }
  ]

  const id = watch("id")
  const name = watch("name")
  const email = watch("email")
  const phone = watch("phone")
  const filtered = filteredData.filter((item) => {
    return (
      item.ID.toString().includes(id) &&
      item.EN_Name.toLowerCase().includes(name.toLowerCase()) &&
      item.email.toLowerCase().includes(email.toLowerCase()) &&
      item.phone.includes(phone)
    )
  })

  const clearData = () => {
    setFilteredData(universities)
    setValue("id", "")
    setValue("name", "")
    setValue("email", "")
    setValue("phone", "")
  }

  const isBlank = () => {
    return id === "" && name === "" && email === "" && phone === ""
  }
  return (
    <>
      <Breadcrumbs
        title={`${t("universities")}`}
        data={[{ title: t("list"), link: "/universities/list" }]}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="8" md="8">
                  <Row>
                    <Col lg="3" md="6">
                      <Label key="id">ID :</Label>
                      <input
                        {...register("id")}
                        placeholder="ID"
                        type="text"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="3" md="6">
                      <Label key="name">University Name :</Label>
                      <input
                        {...register("name")}
                        placeholder="University Name"
                        type="text"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="3" md="6">
                      <Label key="email">Email Address:</Label>
                      <input
                        {...register("email")}
                        placeholder="Email Address"
                        type="email"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="3" md="6">
                      <Label key="phone">Phone Number:</Label>
                      <input
                        {...register("phone")}
                        placeholder="Phone Number"
                        type="number"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg="4" md="4">
                  <Row className="m-2">
                    <Col lg="4" md="4">
                      <Button outline onClick={clearData}>
                        {isBlank() ? "Filter" : "Reset"}
                      </Button>
                    </Col>
                    <Col lg="6" md="4">
                      <Button
                        color="primary"
                        onClick={() => {
                          setFormModal(!formModal)
                        }}
                      >
                        Add University
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <DataTable data={filtered} columns={cols} />
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
