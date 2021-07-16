/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";


export function CashBookTableWidget({ className, cashBook, totalCount }) {
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
        <div className="table-responsive">
          <table
            className="table table-head-custom table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <thead>
              <tr className="text-left">
                <th className="pl-0" style={{ width: "20px" }}>
                  <label className="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" value="1" />
                    <span></span>
                  </label>
                </th>
                <th style={{ width: "150px" }}>Date</th>
                <th className="pr-0" style={{ minWidth: "150px" }}>
                  Particulars
                </th>
                <th className="text-center" style={{ minWidth: "70px" }}>
                  CashIn
                </th>
                <th className="text-center" style={{ minWidth: "70px" }}>
                  CashOut
                </th>
                <th className="text-center" style={{ minWidth: "70px" }}>
                  Balance
                </th>
                {/* <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                  action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {cashBook &&
                cashBook.map((item) => (
                  <tr>
                    <td className="pl-0">
                      <label className="checkbox checkbox-lg checkbox-single">
                        <input type="checkbox" value="1" />
                        <span></span>
                      </label>
                    </td>
                    <td className="pl-0">{item.eDate}</td>
                    <td className="pr-0">{item.particulars}</td>
                    <td className="text-primary text-center">{item.cashIn}</td>
                    <td className="text-danger text-center">{item.cashOut}</td>
                    <td className="text-success text-center">
                      {item.cashBalance}
                    </td>
                    {/* <td className="pr-0 text-right">
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Settings-1.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
