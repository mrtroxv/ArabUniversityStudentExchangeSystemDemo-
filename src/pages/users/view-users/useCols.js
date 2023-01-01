import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useLang } from "../../../utility/hooks/custom/useLang"
import { Button } from "reactstrap"
import { FileText } from "react-feather"
import ReactCountryFlag from "react-country-flag"
const useCols = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [lang] = useLang()
  const cols = [
    {
      name: "Name",
      sortable: true,
      minWidth: "100px",
      cell: (row) => {
        return (
          <div className="d-flex gap-1">
            <ReactCountryFlag
              svg
              className="country-flag flag-icon"
              countryCode={row.city_id.toLowerCase()}
            />
            {lang === "en" ? row.EN_Name : row.AR_Name}
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
          <div className="d-flex gap-2">
            <Button
              type="button"
              color="white"
              className="table-button_edit"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/universities/profile/${row.id}`)
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
  ]
  return {
    cols
  }
}

export default useCols
