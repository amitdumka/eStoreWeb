/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { IconButton, TableHead } from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableFooter,
  TableRow,
} from "@material-ui/core";
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={{ flexShrink: 0, marginLeft: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export function CashBookTablePageWidget({ className, cashBook, totalCount }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, totalCount - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Cash Book(s)
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Total:{totalCount}
          </span>
        </h3>
        <div className="card-toolbar">
          <a
            href="#"
            className="btn btn-success font-weight-bolder font-size-sm"
          >
            <span className="svg-icon svg-icon-md svg-icon-white">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
                className="h-50 align-self-center"
              ></SVG>
            </span>
            Today
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-0">
        {/* begin::Table */}
        <div className={{ overflowX: "auto" }}>
          <Table
            className="table table-head-custom table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Particulars</TableCell>
                <TableCell align="center">cashIn</TableCell>
                <TableCell align="center">cashOut</TableCell>
                <TableCell align="center">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cashBook &&
                Array.from(cashBook).reverse()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          {" "}
                          {new Date(row.eDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          {row.particulars}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                          {row.cashIn}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <span className="text-danger font-weight-bolder d-block font-size-lg">
                          {row.cashOut}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <span className="text-warning font-weight-bolder d-block font-size-lg">
                          {row.cashBalance}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 38 * emptyRows }}>
                  <TableCell colSpan={0} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 7]}
                  colSpan={6}
                  count={totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "Rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
