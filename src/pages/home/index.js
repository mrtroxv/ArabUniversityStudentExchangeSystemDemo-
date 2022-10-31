// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
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
import ownedImage from "@src/assets/images/svg/icons8_box.svg"
import sentImage from "@src/assets/images/svg/icons8_paper_plane.svg"
import obtainedImage from "@src/assets/images/svg/icons8_post_office.svg"
import activeImage from "@src/assets/images/svg/icons8_hard_working.svg"
import DataTableWithButtons from "../../components/custom/table/ReactTable"
import { Archive, Edit, FileText, MoreVertical, Trash } from "react-feather"
import OfferWizard from "../Offers/create-offer/OfferWizard"
import { selectAllOffers } from "../../redux/project/offers"
<<<<<<< HEAD
import { useForm } from "react-hook-form"

function Home() {
  const offersList = useSelector(selectAllOffers)
  const { register, watch } = useForm()
=======
import { selectAllUniversities } from "../../redux/project/universities"
import { selectAllStudents } from "../../redux/project/students"

function Home() {
  const offersList = useSelector(selectAllOffers)
  const universities = useSelector(selectAllUniversities)
  const students = useSelector(selectAllStudents)
>>>>>>> deca213484b00aaaab9f53295aaec08e47f6d45d
  const [filteredData, setFilteredData] = useState([])
  const [formModal, setFormModal] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
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
      minWidth: "300px",
      selector: (row) => row.major_name
    },
    {
      name: "Status",
      minWidth: "50px",
      sortable: (row) => row.status,
      cell: (row) => {
        return (
          <Badge color={"light-success"} pill>
            {row.status}
          </Badge>
        )
      }
    },
    {
      name: t("date"),
      sortable: true,
      minWidth: "175px",
      selector: (row) => new Date(row.offer_date).toLocaleDateString()
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex">
            <UncontrolledDropdown>
              <DropdownToggle className="pe-1" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/view-offers/${row.id}`)
                  }}
                >
                  <FileText size={15} />
                  <span className="align-middle ms-50">Details</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <Archive size={15} />
                  <span className="align-middle ms-50">Archive</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <Trash size={15} />
                  <span className="align-middle ms-50">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button
              type="button"
              color="white"
              className="table-button_edit"
              onClick={(e) => {
                e.preventDefault()
                setEditingOffer(
                  offersList.filter((offer) => offer.id === row.id)[0]
                )
                setFormModal(!formModal)
              }}
            >
              <Edit size={15} />
            </Button>
          </div>
        )
      }
    }
  ]

  useEffect(() => {
    setFilteredData(offersList)
    console.log(offersList)
  }, [offersList])

  useEffect(() => {
    console.log(universities)
  }, [universities])

  useEffect(() => {
    console.log(students)
  }, [students])


  const viewTableHandler = (route) => {
    setFilteredData(
      filteredData.filter((offer) => {
        return offer.status === route
      })
    )
  }

  const handleOfferPopUp = () => {
    setFormModal(!formModal)
  }

  const id = watch("id")
  const college = watch("college")
  const major = watch("major")
  const offers = filteredData.filter((offer) => {
    return (
      offer.id.toString().includes(id) &&
      offer.college_name.toLowerCase().includes(college.toLowerCase()) &&
      offer.major_name.toLowerCase().includes(major.toLowerCase())
    )
  })
  return (
    <Fragment>
      <Breadcrumbs
        title={`${t("home")}`}
        data={[{ title: t("home"), link: "/" }]}
      />
      <Row className="match-height">
        <Col lg="6" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              <OffersFilter
                onView={viewTableHandler}
                filter="owned"
                title="ownedOffers"
                src={ownedImage}
              />
            </Col>
            <Col lg="6" md="3" xs="6">
              <OffersFilter
                onView={viewTableHandler}
                filter="sent"
                title="sentOffers"
                src={sentImage}
              />
            </Col>
            <Col lg="6" md="3" xs="6">
              <OffersFilter
                onView={viewTableHandler}
                filter="obtained"
                title="obtainedOffers"
                src={obtainedImage}
              />
            </Col>
            <Col lg="6" md="3" xs="6">
              <OffersFilter
                onView={viewTableHandler}
                filter="active"
                title="activeOffers"
                src={activeImage}
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
                <Col lg="4" md="6">
                  <Label key="id">ID :</Label>
                  <input
                    {...register("id")}
                    placeholder="ID"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg="4" md="6">
                  <Label key="college_name">College Name :</Label>
                  <input
                    {...register("college")}
                    placeholder="College"
                    type="text"
                    className="form-control"
                  />
                </Col>
                <Col lg="4" md="6">
                  <Label key="major_name">Major Name :</Label>
                  <input
                    {...register("major")}
                    placeholder="Major"
                    type="text"
                    className="form-control"
                  />
                </Col>
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
        <DataTableWithButtons data={offers} columns={cols} />
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
            Add Offer
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

export default Home
