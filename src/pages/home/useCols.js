import React, { useState } from "react"
import { Copy, FileText, Trash } from "react-feather"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Badge, Button } from "reactstrap"
import { deleteOffer } from "../../redux/project/offers"

const useCols = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [duplicateDialogData, setDuplicateDialogData] = useState({
    id: undefined,
    isOpen: false
  })

  const handleToggleDuplicateDialog = (data) => setDuplicateDialogData(data)
  const toggleDuplicateDialog = () =>
    setDuplicateDialogData((prev) => ({ ...prev, isOpen: !prev.isOpen }))

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
    },
    {
      name: t("date"),
      sortable: true,
      minWidth: "175px",
      selector: (row) => new Date(row.offer_date).toLocaleDateString()
    },
    {
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
              <>
                <Button
                  type="button"
                  color="white"
                  className="table-button_edit"
                  onClick={(e) => {
                    e.preventDefault()
                    toast.promise(dispatch(deleteOffer(row.id)), {
                      loading: t("Deleting"),
                      success: t("Deleted"),
                      error: t("Error")
                    })
                  }}
                >
                  <Trash size={15} />
                </Button>
                <Button
                  type="button"
                  color="white"
                  className="table-button_edit"
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
  ]
  return {
    cols,
    toggleDuplicateDialog,
    duplicateDialogData
  }
}

export default useCols
