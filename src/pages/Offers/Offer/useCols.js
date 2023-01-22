import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { FileText, Trash, Edit } from "react-feather"
import ReactCountryFlag from "react-country-flag"
import { useSelector } from "react-redux"
import { selectUser } from "../../../redux/authentication"

const useCols = (toggleEditForm) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const store = useSelector((state) => state.appOffers?.selectedOffer?.offer)
  const user = useSelector(selectUser)
  const cols = [
    {
      name: t("name"),
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
            {row.name}
          </div>
        )
      }
    },
    {
      name: t("email"),
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.email
    },
    {
      name: t("phone"),
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
                navigate(`/candidates/profile/${row.ID}`)
              }}
            >
              <FileText size={15} />
            </Button>
            {store.status === 3 &&
              user.university_id === store.University_id_des && (
                <Button type="button" color="warning" onClick={toggleEditForm}>
                  <Edit size={15} />
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
