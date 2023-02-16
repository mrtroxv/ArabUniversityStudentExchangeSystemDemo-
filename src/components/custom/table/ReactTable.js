import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"

// ** Reactstrap Imports
import "./react-dataTable-component.scss"
import { useNavigate } from "react-router-dom"
const DataTableWithButtons = ({ data, columns, clickAttr, link }) => {
  const navigate = useNavigate()
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
        onRowClicked={(row) => {
          if (clickAttr && link) {
            navigate(`${link}/${row[clickAttr]}`)
          }
        }}
      />
    </div>
  )
}

export default DataTableWithButtons
