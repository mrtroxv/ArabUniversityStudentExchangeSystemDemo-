import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"

// ** Reactstrap Imports
import "./react-dataTable-component.scss"
const DataTableWithButtons = ({ data, columns }) => {
  return (
    <div className="react-dataTable">
      <DataTable
        noHeader
        pagination
        data={data}
        columns={columns}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  )
}

export default DataTableWithButtons
