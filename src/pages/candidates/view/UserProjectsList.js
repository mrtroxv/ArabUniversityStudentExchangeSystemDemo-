// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap"

// ** Third Party Components
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
// ** Custom Components
import Avatar from "@components/avatar"

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { useColumns } from "./columns"
import { useSelector } from "react-redux"

import Spinner from "../../../components/custom/loader/Spinner"
import { useTranslation } from "react-i18next"

const ExpandableTable = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="fw-bold">Start Date:</span> {data.train_start_date}
      </p>
      <p>
        <span className="fw-bold">End Date:</span> {data.train_end_date}
      </p>
      <p className="m-0">
        <span className="fw-bold">Description:</span> {data.train_description}
      </p>
    </div>
  )
}

const UserProjectsList = () => {
  const { cols } = useColumns()
  const store = useSelector((state) => state.candidates)
  const { t } = useTranslation()
  const offer = store.selectedUser?.offer ? [store.selectedUser.offer] : []
  return (
    <Card>
      <CardHeader tag="h4">{t("Assigned Offer")}</CardHeader>

      <div className="react-dataTable user-view-account-projects">
        {store.isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            noHeader
            expandableRows
            columns={cols}
            data={offer}
            expandOnRowClicked
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            expandableRowsComponent={ExpandableTable}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        )}
      </div>
    </Card>
  )
}

export default UserProjectsList
