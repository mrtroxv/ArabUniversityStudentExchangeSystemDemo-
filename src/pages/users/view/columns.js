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
import useStatusBadge from "../../../utility/hooks/custom/useStatusBadge"
import { useSelector } from "react-redux"
import { getUniversityName } from "../../../utility/Utils"
import { useLang } from "../../../utility/hooks/custom/useLang"

export const useColumns = () => {
  const { t } = useTranslation()
  const { statusBadge: status } = useStatusBadge()
  const universities = useSelector((state) => state.users?.allData?.activeUsers)
  const [lang] = useLang()
  const cols = [
    {
      name: t("ID"),
      sortable: true,
      maxWidth: "25px",
      selector: (row) => row.id,
      cell: (row) => (
        <Link to={`/view-offers/${row.id}`} className="d-flex">
          <span className="fw-bolder">#</span>
          <span className="fw-bolder">{row.id}</span>
        </Link>
      )
    },
    {
      name: t("Destination University"),
      sortable: true,
      minWidth: "275px",
      selector: (row) => {
        const university = universities?.find(
          (university) => university.ID === row.University_id_des
        )
        return getUniversityName(university, lang)
      },
      cell: (row) => {
        const university = universities?.find(
          (university) => university.ID === row.University_id_des
        )
        return (
          <div className="d-flex align-items-center" md={10}>
            <Avatar img={university?.logo} />
            <div className="d-flex flex-column mx-1">
              <span className="fw-bolder">
                {getUniversityName(university, lang)}
              </span>
              <span className="text-muted fw-bold">{university?.email}</span>
            </div>
          </div>
        )
      }
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
    }
  ]

  return {
    cols
  }
}
