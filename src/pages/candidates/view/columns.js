// ** React Imports
import React, { Fragment } from "react"
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Reactstrap Imports
import { Badge, UncontrolledTooltip } from "reactstrap"

import { useTranslation } from "react-i18next"
import useStatusBadge from "../../../utility/hooks/custom/useStatusBadge"
import { useSelector } from "react-redux"
import { selectUniversity } from "../../users/store"
import { useLang } from "../../../utility/hooks/custom/useLang"
import { getUniversityName } from "../../../utility/Utils"

export const useColumns = () => {
  const { t } = useTranslation()
  const { statusBadge: status } = useStatusBadge()
  const store = useSelector((state) => state.candidates.selectedUser?.offer)
  const offerUniversity = useSelector((state) =>
    selectUniversity(state, store.university_id_src)
  )
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
      name: t("University"),
      sortable: true,
      minWidth: "325px",
      selector: (row) => row.college_name,
      cell: () => (
        <div className="d-flex align-items-center" md={10}>
          <Avatar img={offerUniversity?.logo} />
          <div className="d-flex flex-column mx-1">
            <span className="fw-bolder">
              {getUniversityName(offerUniversity, lang)}
            </span>
            <span className="text-muted fw-bold">{offerUniversity?.email}</span>
          </div>
        </div>
      )
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
        <Badge color={status[row.status]?.color} pill>
          {status[row.status]?.title}
        </Badge>
      )
    }
  ]

  return {
    cols
  }
}
