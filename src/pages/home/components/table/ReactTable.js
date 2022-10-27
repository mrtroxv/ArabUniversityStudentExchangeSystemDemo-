// ** React Imports
import { useEffect, useState } from "react"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from "reactstrap"

const DataTableWithButtons = ({ data, columns }) => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [pagenatedData, setPagenatedData] = useState(data)
  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  useEffect(() => {
    setPagenatedData(data.slice(currentPage * 5, currentPage * 5 + 5))
  }, [currentPage, data])

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(data.length / 5)}
      breakLabel={"..."}
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
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1"
      }
    />
  )

  return (
    <Card>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          data={pagenatedData}
          columns={columns}
          //   expandOnRowClicked
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  )
}

export default DataTableWithButtons
