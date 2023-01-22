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
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap"
import "../../../components/custom/table/react-dataTable-component.scss"

import { useTranslation } from "react-i18next"
// import DataTable from "../../../components/custom/table/ReactTable"
import DataTable from "react-data-table-component"

// import { selectAllUniversities } from "../../../redux/project/universities"
// import { useSelector } from "react-redux"
// import DataTable from "react-data-table-component"

// import { selectAllUniversities } from "../../../redux/project/universities"
import { useForm } from "react-hook-form"
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy
} from "react-feather"
import NewUser from "../create-user/index"
import useCols from "./useCols"
import Spinner from "../../../components/custom/loader/Spinner"
import { getAllData } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { downloadCSV } from "../../../utility/Utils"

const ViewUsers = () => {
  const { register, watch } = useForm()
  const store = useSelector((state) => state.users)
  const [formModal, setFormModal] = useState(false)
  const { t } = useTranslation()
  const { cols } = useCols()
  const dispatch = useDispatch()
  const { status } = useParams()
  // use selector to select universities
  //   const universities = useSelector(selectAllUniversities)

  const toggleModal = () => setFormModal(!formModal)

  useEffect(() => {
    dispatch(getAllData())
  }, [dispatch, store.allData?.length])

  const name = watch("name")
  const email = watch("email")
  const phone = watch("phone")

  // const clearData = () => {
  //   setValue("name", "")
  //   setValue("email", "")
  //   setValue("phone", "")
  // }

  // const isBlank = () => {
  //   return name === "" && email === "" && phone === ""
  // }

  const dataToRender = () => {
    if (
      (store.allData?.activeUsers?.length === 0 &&
        store.allData?.suspendedUsers?.length === 0) ||
      store.isLoading
    ) {
      return []
    }
    const active = store?.allData?.activeUsers
    const suspended = store?.allData?.suspendedUsers

    if (active?.length > 0 || suspended?.length > 0) {
      switch (status) {
        case "active":
          return active
            ?.filter((item) => item !== undefined)
            ?.filter(
              (item) =>
                item?.EN_Name?.toLowerCase().includes(name?.toLowerCase()) &&
                item?.AR_Name?.toLowerCase().includes(name?.toLowerCase()) &&
                item?.email?.toLowerCase().includes(email?.toLowerCase()) &&
                item?.phone?.includes(phone)
            )
        case "suspended":
          return suspended
            ?.filter((item) => item !== undefined)
            ?.filter(
              (item) =>
                item?.EN_Name?.toLowerCase().includes(name?.toLowerCase()) &&
                item?.AR_Name?.toLowerCase().includes(name?.toLowerCase()) &&
                item?.email?.toLowerCase().includes(email?.toLowerCase()) &&
                item?.phone?.includes(phone)
            )
      }
    }
    return []
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
              <Row>
                <Col md="3">
                  <Label key="name">{t("University Name")} :</Label>
                  <input
                    {...register("name")}
                    placeholder="University Name"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col md="3">
                  <Label key="email">{t("Email Address")} :</Label>
                  <input
                    {...register("email")}
                    placeholder="Email Address"
                    type="email"
                    className="form-control"
                  />
                </Col>
                <Col md="3">
                  <Label key="phone">{t("Phone Number")} :</Label>
                  <input
                    {...register("phone")}
                    placeholder="Phone Number"
                    type="number"
                    className="form-control"
                  />
                </Col>
                <Col
                  md="3"
                  className="d-flex align-items-end justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
                >
                  <div className="d-flex align-items-center table-header-actions">
                    <UncontrolledDropdown className="me-1">
                      <DropdownToggle color="secondary" caret outline>
                        <Share className="font-small-4 me-50" />
                        <span className="align-middle">Export</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="w-100">
                          <Printer className="font-small-4 me-50" />
                          <span className="align-middle">Print</span>
                        </DropdownItem>
                        <DropdownItem
                          className="w-100"
                          onClick={() => downloadCSV(store.data, store)}
                        >
                          <FileText className="font-small-4 me-50" />
                          <span className="align-middle">CSV</span>
                        </DropdownItem>
                        <DropdownItem className="w-100">
                          <Grid className="font-small-4 me-50" />
                          <span className="align-middle">Excel</span>
                        </DropdownItem>
                        <DropdownItem className="w-100">
                          <File className="font-small-4 me-50" />
                          <span className="align-middle">PDF</span>
                        </DropdownItem>
                        <DropdownItem className="w-100">
                          <Copy className="font-small-4 me-50" />
                          <span className="align-middle">Copy</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>

                    <Button
                      className="add-new-user"
                      color="primary"
                      onClick={toggleModal}
                    >
                      Add
                    </Button>
                    {/* <Button outline onClick={clearData}>
                      {isBlank() ? t("Filter") : t("Reset")}
                    </Button> */}
                  </div>
                </Col>
              </Row>
            </CardBody>
            <Card className="overflow-hidden">
              <div className="react-dataTable">
                {store.isLoading ? (
                  <Spinner />
                ) : (
                  <DataTable
                    noHeader
                    pagination
                    responsive
                    columns={cols}
                    sortIcon={<ChevronDown />}
                    className="react-dataTable"
                    data={dataToRender()}
                  />
                )}
              </div>
            </Card>
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
            {t("Create New User")}
          </ModalHeader>
          <ModalBody>
            <NewUser
              outerSubmit={() => {}}
              type="vertical"
              onClose={() => setFormModal(!formModal)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

export default ViewUsers
