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
import { useForm } from "react-hook-form"
import { selectAllStudents } from "../../../redux/project/students"
import CandidateForm from "../candidate-form/CandidateForm"

const ViewCandidates = () => {
  const { register, setValue, watch } = useForm()

  const { t } = useTranslation()
  // use selector to select universities
  //   const universities = useSelector(selectAllUniversities)
  const candidates = useSelector(selectAllStudents)
  const [filteredData, setFilteredData] = useState([])
  const [formModal, setFormModal] = useState(false)
  useEffect(() => {
    setFilteredData(candidates)
  }, [candidates])

  const cols = [
    {
      name: t("id"),
      sortable: true,
      maxWidth: "25px",
      selector: (row) => row.ID
    },
    {
      name: t("name"),
      sortable: true,
      minWidth: "100px",
      selector: (row) => row.name
    },
    {
      name: t("email"),
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.email
    },
    {
      name: t("phone"),
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.phone
    }
  ]

  const id = watch("id")
  const name = watch("name")
  const email = watch("email")
  // const phone = watch("phone")
  const filtered = filteredData.filter((item) => {
    return (
      item.ID.toString().includes(id) &&
      item.name.toLowerCase().includes(name.toLowerCase()) &&
      item.email.toLowerCase().includes(email.toLowerCase())
      // item.phone.includes(phone)
    )
  })
  const clearData = () => {
    setFilteredData(universities)
    setValue("id", "")
    setValue("name", "")
    setValue("email", "")
    // setValue("phone", "")
  }
  const isBlank = () => {
    return id === "" && name === "" && email === ""
  }
  return (
    <>
      <Breadcrumbs
        title={t("Candidates")}
        data={[{ title: t("list"), link: "/candidates" }]}
      />
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>{t("Filters")}</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="8" md="8">
                  <Row>
                    <Col lg="4" md="6">
                      <Label key="id">{t("id")} :</Label>
                      <input
                        {...register("id")}
                        placeholder="ID"
                        type="text"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="4" md="6">
                      <Label key="name">{t("university")} :</Label>
                      <input
                        {...register("name")}
                        placeholder="University Name"
                        type="text"
                        className="form-control"
                      />
                    </Col>
                    <Col lg="4" md="6">
                      <Label key="email">{t("email")}:</Label>
                      <input
                        {...register("email")}
                        placeholder="Email Address"
                        type="text"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg="4" md="4">
                  <Row className="m-2">
                    <Col lg="4" md="4">
                      <Button outline onClick={clearData}>
                        {isBlank() ? t("Filter") : "Reset"}
                      </Button>
                    </Col>
                    <Col lg="6" md="4">
                      <Button
                        color="primary"
                        onClick={() => {
                          setFormModal(!formModal)
                        }}
                      >
                        {t("Add Candidate")}
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
            {t("Add Candidate")}
          </ModalHeader>
          <ModalBody>
            <CandidateForm
              // outerSubmit={handleOfferPopUp}
              type="modern-vertical"
              onClose={() => setFormModal(!formModal)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

export default ViewCandidates
