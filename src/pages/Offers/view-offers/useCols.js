import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import useUniversityApi from "../../../utility/hooks/custom/useUniversityApi"
import { findDestinationUniversity, findSourceUniversity } from "./utils"
import { FileText, Trash, Copy } from "react-feather"
import { Badge, Button } from "reactstrap"
import { deleteOffer } from "../../../redux/project/offers"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import DuplicateDialog from "./DuplicateDialog"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import { useLang } from "../../../utility/hooks/custom/useLang"
const MySwal = withReactContent(Swal)

const useCols = () => {
  const { t } = useTranslation()
  const { universities } = useUniversityApi()
  const [lang] = useLang()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [duplicateDialogData, setDuplicateDialogData] = useState({
    id: undefined,
    isOpen: false
  })

  const handleToggleDuplicateDialog = (data) => setDuplicateDialogData(data)
  const toggleDuplicateDialog = () =>
    setDuplicateDialogData((prev) => ({ ...prev, isOpen: !prev.isOpen }))
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
    cell: (row) => findDestinationUniversity(row, universities, lang)
  }
  const srcUniversityCol = {
    name: t("Source University"),
    sortable: true,
    minWidth: "100px",
    cell: (row) => findSourceUniversity(row, universities, lang)
  }
  const statusCol = {
    name: t("offerStatus"),
    minWidth: "40px",
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
    minWidth: "50px",
    selector: (row) => new Date(row.offer_date).toLocaleDateString()
  }
  const actionsCol = {
    name: t("actions"),
    allowOverflow: true,
    minWidth: "200px",
    cell: (row) => {
      return (
        <div className="d-flex">
          <Button
            type="button"
            color="white"
            // className="table-button_edit"
            onClick={(e) => {
              e.preventDefault()
              navigate(`/view-offers/${row.id}`)
            }}
          >
            <FileText size={15} />
          </Button>
          {row.status === 0 && (
            <>
              <Button
                type="button"
                color="white"
                // className="table-button_edit"
                onClick={() => {
                  return MySwal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert user!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, Delete Offer!",
                    customClass: {
                      confirmButton: "btn btn-primary",
                      cancelButton: "btn btn-outline-danger ms-1"
                    },
                    buttonsStyling: false
                  }).then(function (result) {
                    if (result.value) {
                      MySwal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Offer has been deleted.",
                        customClass: {
                          confirmButton: "btn btn-success"
                        }
                      })
                        .then(() =>
                          toast.promise(dispatch(deleteOffer(row.id)), {
                            loading: t("Deleting"),
                            success: t("Deleted"),
                            error: t("Error")
                          })
                        )
                        .then(() => navigate(-1))
                    } else if (result.dismiss === MySwal.DismissReason.cancel) {
                      MySwal.fire({
                        title: "Cancelled",
                        text: "Cancelled Deletion :)",
                        icon: "error",
                        customClass: {
                          confirmButton: "btn btn-success"
                        }
                      })
                    }
                  })
                }}
              >
                <Trash size={15} />
              </Button>
              <Button
                type="button"
                color="white"
                // className="table-button_edit"
                onClick={() =>
                  handleToggleDuplicateDialog({
                    id: row.id,
                    isOpen: true
                  })
                }
              >
                <Copy size={15} />
              </Button>
            </>
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
    ],
    "finished-offers": [
      ...cols,
      desUniversityCol,
      statusCol,
      dateCol,
      actionsCol
    ]
  }
  return {
    cols: colsMap,
    toggleDuplicateDialog,
    duplicateDialogData
  }
}

export default useCols
