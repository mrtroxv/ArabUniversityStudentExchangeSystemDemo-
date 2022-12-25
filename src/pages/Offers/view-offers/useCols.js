import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import useUniversityApi from "../../../utility/hooks/custom/useUniversityApi"
import { findDestinationUniversity, findSourceUniversity } from "./utils"
import { Archive, Edit, FileText, MoreVertical, Trash } from "react-feather"
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
const useCols = () => {
  const { t } = useTranslation()
  const { universities } = useUniversityApi()
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
      minWidth: "100px",
      selector: (row) => row.major_name
    }
  ]
  const status = {
    0: { title: t("Creating Offer"), color: "light-primary" },
    1: { title: t("Pending Request"), color: "light-warning" },
    2: { title: t("Accepted"), color: "light-info" },
    3: { title: t("Ready to Start"), color: "light-success" },
    4: { title: t("Offer Report"), color: "light-primary" },
    5: { title: t("Finished"), color: "light-danger" }
  }

  const desUniversityCol = {
    name: t("Destination University"),
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.university_id_des,
    cell: (row) => findDestinationUniversity(row, universities)?.EN_Name
  }
  const srcUniversityCol = {
    name: t("Source University"),
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.university_id_src,
    cell: (row) => findSourceUniversity(row, universities)?.EN_Name
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
    minWidth: "100px",
    selector: (row) => new Date(row.offer_date).toLocaleDateString()
  }
  const actionsCol = {
    name: t("actions"),
    allowOverflow: true,
    minWidth: "75px",
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
  return { cols: colsMap }
}

export default useCols
