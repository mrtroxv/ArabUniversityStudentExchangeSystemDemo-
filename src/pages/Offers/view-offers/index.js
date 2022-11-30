// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom"
import Breadcrumbs from "@components/breadcrumbs"
import Toast from "react-hot-toast"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Badge,
  Button,
  ModalHeader,
  Modal,
  ModalBody,
  Label,
  Input,
  ModalFooter,
  ButtonToggle
} from "reactstrap"

import UserDetails from "./components/UserDetails"
// import TableBasic from './components/table/Table'
import { useTranslation } from "react-i18next"

// import axios from "axios"
import OffersFilter from "./components/OffersFilter"
// import ownedImage from "@src/assets/images/svg/icons8_box.svg"
// import sentImage from "@src/assets/images/svg/icons8_paper_plane.svg"
// import obtainedImage from "@src/assets/images/svg/icons8_post_office.svg"
// import activeImage from "@src/assets/images/svg/icons8_hard_working.svg"
import allOffers from "@src/assets/images/svg/docs.svg"
import activeOffers from "@src/assets/images/svg/clock.svg"
import expiredOffers from "@src/assets/images/svg/expired.svg"
import DataTableWithButtons from "../../../components/custom/table/ReactTable"
import { Archive, Edit, FileText, MoreVertical, Trash } from "react-feather"
import OfferWizard from "../create-offer/OfferWizard"
import {
  selectCreatedOffers,
  selectObtainedOffers,
  selectSentOffers
} from "../../../redux/project/offers"
import { useForm } from "react-hook-form"
import { selectUserID } from "../../../redux/authentication"
import { selectAllUniversities } from "../../../redux/project/universities"

function ViewOffers() {
  const { register, watch } = useForm()
  const userId = useSelector(selectUserID)
  const universities = useSelector(selectAllUniversities)
  const { status: data } = useParams()
  const [formModal, setFormModal] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [filteredData, setFilteredData] = useState([])

  const breadcrumbs = {
    "created-offers": {
      title: "Created Offers",
      link: "/offers/created-offers",
      query: (state) => selectCreatedOffers(state, +userId),
      cols: ["ID", "college", "major", "status", "date", "actions"]
    },
    "sent-offers": {
      title: "Sent Offers",
      link: "/offers/sent-offers",
      query: (state) => selectSentOffers(state, +userId),
      cols: [
        "ID",
        "college",
        "major",
        "status",
        "date",
        "university_id_des",
        "actions"
      ]
    },
    "obtained-offers": {
      title: "Obtained Offers",
      link: "/offers/obtained-offers",
      query: (state) => selectObtainedOffers(state, +userId),
      cols: [
        "ID",
        "college",
        "major",
        "status",
        "date",
        "university_id_src",
        "actions"
      ]
    }
  }
  const offersList = useSelector(breadcrumbs[data].query)
  const status = {
    0: { title: t("Creating Offer"), color: "light-primary" },
    1: { title: t("Pending Request"), color: "light-warning" },
    2: { title: t("Accepted"), color: "light-success" },
    3: { title: t("Rejected"), color: "light-danger" },
    4: { title: t("Pending Acceptance"), color: "light-warning" },
    5: { title: t("Offer Report"), color: "light-primary" },
    6: { title: t("Expired"), color: "light-danger" }
  }

  const cols = [
    {
      name: "ID",
      sortable: true,
      maxWidth: "25px",
      selector: (row) => row.id
    },
    {
      name: t("college"),
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.college_name
    },
    {
      name: t("major"),
      sortable: true,
      minWidth: "100px",
      selector: (row) => row.major_name
    }
  ]

  const desUniversityCol = {
    name: t("Destination University"),
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.university_id_des,
    cell: (row) => {
      const university = universities.find(
        (university) => university.id === row.university_id_des
      )
      return university ? university.EN_Name : ""
    }
  }
  const srcUniversityCol = {
    name: t("Source University"),
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.university_id_src,
    cell: (row) => {
      const university = universities.find(
        (university) => university.id === row.university_id_src
      )
      return university ? university.EN_Name : ""
    }
  }
  const statusCol = {
    name: t("offerStatus"),
    minWidth: "50px",
    sortable: (row) => row.status,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  }
  const dateCol = {
    name: t("date"),
    sortable: true,
    minWidth: "175px",
    selector: (row) => new Date(row.offer_date).toLocaleDateString()
  }
  const actionsCol = {
    name: t("actions"),
    allowOverflow: true,
    cell: (row) => {
      return (
        <div className="d-flex gap-2">
          <Button
            type="button"
            color="white"
            className="table-button_edit"
            onClick={(e) => {
              e.preventDefault()
              navigate(`/view-offers/${row.id}`)
            }}
          >
            <FileText size={15} />
          </Button>
          {row.status === 0 && (
            <Button
              type="button"
              color="white"
              className="table-button_edit"
              onClick={(e) => e.preventDefault()}
            >
              <Trash size={15} />
            </Button>
          )}
        </div>
      )
    }
  }
  const colsMap = {
    "created-offers": [...cols, statusCol, dateCol, actionsCol],
    "sent-offers": [...cols, desUniversityCol, statusCol, dateCol, actionsCol],
    "obtained-offers": [
      ...cols,
      srcUniversityCol,
      statusCol,
      dateCol,
      actionsCol
    ]
  }

  useEffect(() => {
    setFilteredData(offersList)
  }, [])

  const viewTableHandler = (date) => {
    if (date === "all") {
      setFilteredData(offersList)
    } else if (date === "active") {
      setFilteredData(
        offersList.filter((offer) => offer.status === 0 || offer.status === 1)
      )
    } else if (date === "expired") {
      setFilteredData(
        offersList.filter((offer) => offer.status === 2 || offer.status === 3)
      )
    }
  }

  const handleOfferPopUp = () => {
    setFormModal(!formModal)
  }

  const id = watch("id")
  const college = watch("college")
  const major = watch("major")
  const universityID = watch("university_id") || ""
  const offers = filteredData.filter((offer) => {
    return (
      offer.id.toString().includes(id) &&
      offer.college_name.toLowerCase().includes(college.toLowerCase()) &&
      offer.major_name.toLowerCase().includes(major.toLowerCase()) &&
      (offer.university_id_des?.toString().includes(String(universityID)) ||
        offer.university_id_src?.toString().includes(String(universityID)))
    )
  })

  return (
    <Fragment>
      <Breadcrumbs
        title={`${t("Offers")}`}
        data={[
          { title: t("Offers"), link: "/Offers" },
          { title: t(breadcrumbs[data].title), link: breadcrumbs[data].link }
        ]}
      />
      <Row className="match-height">
        <Col lg="6" md="12">
          <Row className="match-height">
            <Col lg="12" md="12">
              <OffersFilter
                onView={viewTableHandler}
                filter="all"
                title="All Offers"
                src={allOffers}
              />
            </Col>
            <Col lg="6" md="3" xs="6">
              <OffersFilter
                onView={viewTableHandler}
                filter="active"
                title="Active Offers"
                src={activeOffers}
              />
            </Col>
            <Col lg="6" md="3" xs="6">
              <OffersFilter
                onView={viewTableHandler}
                filter="expired"
                title="Expired Offers"
                src={expiredOffers}
              />
            </Col>
          </Row>
        </Col>
        <Col lg="6" md="12">
          <UserDetails />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Row>
            <Col lg="10" md="8">
              <Row>
                <Col lg={data === "created-offers" ? "4" : "3"} md="6">
                  <Label key="id">{t("ID")} :</Label>
                  <input
                    {...register("id")}
                    placeholder="ID"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={data === "created-offers" ? "4" : "3"} md="6">
                  <Label key="college_name">{t("college")} :</Label>
                  <input
                    {...register("college")}
                    placeholder="College"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg={data === "created-offers" ? "4" : "3"} md="6">
                  <Label key="major_name">{t("major")} :</Label>
                  <input
                    {...register("major")}
                    placeholder="Major"
                    type="text"
                    className="form-control"
                  />
                </Col>
                {data !== "created-offers" && (
                  <Col lg="3" md="6">
                    <Label key="university_id">
                      {data === "sent-offers"
                        ? t("Destination University")
                        : t("Source University")}{" "}
                      :
                    </Label>
                    <input
                      {...register("university_id")}
                      placeholder="University"
                      type="text"
                      className="form-control"
                    />
                  </Col>
                )}
              </Row>
            </Col>
            <Col lg="2" md="4">
              <Button
                color="primary"
                className="m-2"
                onClick={handleOfferPopUp}
              >
                {t("createOffer")}
              </Button>
            </Col>
          </Row>
        </CardBody>
        <DataTableWithButtons data={offers} columns={colsMap[data]} />
      </Card>
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
            <OfferWizard
              outerSubmit={handleOfferPopUp}
              type="modern-vertical"
              onClose={() => setFormModal(!formModal)}
            />
          </ModalBody>
        </Modal>
      )}
      {
        // <ToastContainer />
      }
    </Fragment>
  )
}

export default ViewOffers
