// ** React Imports
import React, { Fragment } from "react"
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Reactstrap Imports
import { Badge, UncontrolledTooltip } from "reactstrap"

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from "react-feather"
import { useTranslation } from "react-i18next"

export const useColumns = () => {
  const { t } = useTranslation()

  // ** Table columns
  const status = {
    0: { title: t("Creating Offer"), color: "light-primary" },
    1: { title: t("Pending Request"), color: "light-warning" },
    2: { title: t("Accepted"), color: "light-info" },
    3: { title: t("Ready to Start"), color: "light-success" },
    4: { title: t("Offer Report"), color: "light-primary" },
    5: { title: t("Finished"), color: "light-danger" }
  }
  const cols = [
    {
      name: t("college"),
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.college_name
    },
    {
      name: t("major"),
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.major_name
    },
    {
      name: t("offerStatus"),
      minWidth: "50px",
      sortable: (row) => row.status,
      cell: (row) => (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    },
    {
      name: t("date"),
      sortable: true,
      minWidth: "175px",
      selector: (row) => new Date(row.offer_date).toLocaleDateString()
    }
  ]

  return {
    cols
  }
}
