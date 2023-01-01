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

const UserProjectsList = () => {
  const { cols } = useColumns()
  const store = useSelector((state) => state.users)
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader tag="h4">{t("Offers List")}</CardHeader>

      <div className="react-dataTable user-view-account-projects">
        {store.isLoading ? (
          <Spinner />
        ) : (
          <DataTable
            noHeader
            responsive
            pagination
            columns={cols}
            data={store.selectedUser.offers}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
          />
        )}
      </div>
    </Card>
  )
}

export default UserProjectsList
