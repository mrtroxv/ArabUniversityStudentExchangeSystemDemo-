// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import Breadcrumbs from "@components/breadcrumbs"
import Toast, { toast } from "react-hot-toast"
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
  ModalFooter
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
import DataTableWithButtons from "./components/table/ReactTable"
import { Archive, Edit, FileText, MoreVertical, Trash } from "react-feather"
import OfferWizard from "../create-offer/OfferWizard"
import { selectAllOffers, fetchOffers } from "../../redux/project/offers"

function Home() {
  // eslint-disable-next-line
  const offersList = useSelector(selectAllOffers)
  const [filteredData, setFilteredData] = useState([])
  //   const [offersStatus, setOffersStatus] = useState("pending")
  const [formModal, setFormModal] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const cols = [
    {
      name: "ID",
      sortable: true,
      maxWidth: "25px",
      selector: (row) => row.id
    },
    {
      name: t("collage"),
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.collage
    },
    {
      name: t("major"),
      sortable: true,
      minWidth: "300px",
      selector: (row) => row.major
    },
    {
      name: t("status"),
      sortable: true,
      minWidth: "50px",
      selector: (row) => row.status
    },
    {
      name: t("date"),
      sortable: true,
      minWidth: "175px",
      selector: (row) => new Date(row.end_date).toLocaleDateString()
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
            <Edit
              size={15}
              onClick={(e) => {
                e.preventDefault()
                console.log(row.id)
              }}
            />
          </div>
        )
      }
    }
  ]
  useEffect(() => {
    toast.promise(dispatch(fetchOffers()), {
      loading: "Loading",
      success: "Success",
      error: "Error"
    })
  }, [])

  useEffect(() => {
    setFilteredData(offersList)
  }, [offersList])
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
  return (
    <Fragment>
      <Breadcrumbs title={`${t("home")}`} data={[]} />
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
        <Row className="p-2">
          <Col lg="12" md="12">
            <Button color="primary" onClick={handleOfferPopUp}>
              {t("createOffer")}
            </Button>
          </Col>
        </Row>

        <DataTableWithButtons data={filteredData} columns={cols} />
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
            />
          </ModalBody>
        </Modal>
      )}
    </Fragment>
  )
}

export default Home
