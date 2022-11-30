import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"

// ** Reactstrap Imports
import "./react-dataTable-component.scss"
import { useState } from "react"
import ReactPaginate from "react-paginate"
const DataTableWithButtons = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(0)
  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        data.length
          ? Math.ceil(data.length / 7)
          : Math.ceil(data.length / 7) || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  )
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
        paginationComponent={CustomPagination}
        paginationDefaultPage={currentPage + 1}
      />
    </div>
  )
}

export default DataTableWithButtons
