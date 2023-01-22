import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useLang } from "../../../utility/hooks/custom/useLang"
import { Button } from "reactstrap"
import { FileText, Trash } from "react-feather"
import ReactCountryFlag from "react-country-flag"
import { getUniversityName } from "../../../utility/Utils"
import Avatar from "../../../@core/components/avatar"
const useCols = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [lang] = useLang()
  const cols = [
    {
      name: "Name",
      sortable: true,
      minWidth: "300px",
      maxWidth: "300px",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center" md={10}>
            <Avatar img={row?.logo} />
            <div className="d-flex flex-column mx-1">
              <span className="fw-bolder">{getUniversityName(row, lang)}</span>
              <span className="text-muted fw-bold">{row?.email}</span>
            </div>
          </div>
        )
      }
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
    },
    {
      name: t("actions"),
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="d-flex">
            <Button
              type="button"
              color="white"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/universities/profile/${row.ID}`)
              }}
            >
              <FileText size={15} />
            </Button>
          </div>
        )
      }
    }
  ]
  return {
    cols
  }
}

export default useCols
