/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import {
  Table,
  TableRow,
  TableCell,
  TablePagination,
  TableFooter,
  TableHead,
  TableBody,
} from "@material-ui/core";

export function OverDueTablesWidget({ className, overDue }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rCount = overDue.length;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rCount - page * rowsPerPage);

  return (
    <>
      {/* begin::Advance Table Widget 9 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Delivery Over Due
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              Total Over Due: {rCount}
            </span>
          </h3>
          <div className="card-toolbar">
            <a
              href="/tailoring/booking"
              className="btn btn-info font-weight-bolder font-size-sm mr-3"
            >
              Booking
            </a>
            <a
              href="/tailoring/delivery"
              className="btn btn-danger font-weight-bolder font-size-sm"
            >
              Delivery
            </a>
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            {/* begin::Table */}
            <div className="table-responsive">
              <Table className="table table-head-custom table-vertical-center table-head-bg table-borderless">
                <TableHead>
                  <TableRow className="text-left">
                    <TableCell style={{ minWidth: "150px" }} className="pl-7">
                      <span className="text-dark-75">Customer</span>
                    </TableCell>
                    <TableCell style={{ minWidth: "50px" }}>Date</TableCell>
                    <TableCell style={{ minWidth: "50px" }}>Quantity</TableCell>
                    <TableCell style={{ minWidth: "50px" }}>Days</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overDue &&
                    Array.from(overDue)
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.bookingId} className="text-left">
                          <TableCell className="p-0">
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-25 symbol-light mr-4">
                                <span className="symbol-label">
                                  <SVG
                                    className="h-75 align-self-end"
                                    src={toAbsoluteUrl(
                                      "/media/svg/avatars/001-boy.svg"
                                    )}
                                  ></SVG>
                                </span>
                              </div>
                              <div className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-sm">
                                {row.customerName}

                                <span className="text-success font-weight-bold d-block">
                                  {row.slipNo}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{ minWidth: "50px" }}>
                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm">
                              { new Date(row.delveryDate).toLocaleDateString()}
                            </span>
                            <span className="text-info font-weight-bold">
                              {new Date(row.bookingDate).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: "50px" }}>
                            <span className="text-dark-75 font-weight-bolder d-block font-size-sm">
                              {row.quantity}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: "50px" }}>
                            <span className="text-danger font-weight-bolder d-block font-size-sm">
                              {row.noDays}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 42 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                  <TablePagination
                    colSpan={9}
                    rowsPerPageOptions={[3, 5, 7]}                   
                    count={rCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
            {/* end::Table */}
          </div>
        </div>
        {/* end::Body */}
      </div>
      {/* end::Advance Table Widget 9 */}
    </>
  );
}
