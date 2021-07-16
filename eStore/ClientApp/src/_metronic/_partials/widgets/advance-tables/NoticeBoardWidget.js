/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";

export function NoticeBoardWidget({ className }) {

  

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Notice Board
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Latest News
          </span>
        </h3>
        <div className="card-toolbar">
          <a
            href="#"
            className="btn btn-info font-weight-bolder font-size-sm mr-3"
          >
            New Notice
          </a>
          <a
            href="#"
            className="btn btn-danger font-weight-bolder font-size-sm"
          >
            News
          </a>
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{ minWidth: "250px" }}>
                    <span className="text-dark-75">Information</span>
                  </th>
                  <th style={{ minWidth: "100px" }}>Status</th>
                  <th style={{ minWidth: "100px" }}></th>
                  <th style={{ minWidth: "100px" }}>Posted By</th>
                  {/* <th style={{minWidth: "130px"}}>rating</th>
                  <th style={{minWidth: "80px"}}/> */}
                </tr>
              </thead>
              <tbody>
                <tr>

                </tr>
                <tr>
                  <td className="pl-0 py-8">
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label">
                          <span className="svg-icon h-75 align-self-end">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/avatars/001-boy.svg"
                              )}
                            />
                          </span>
                        </span>
                      </div>
                      <div>
                        <a
                          href="#"
                          className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                        >
                          Brad Simmons
                        </a>
                        <span className="text-muted font-weight-bold d-block">
                          HTML, JS, ReactJS
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      $8,000,000
                    </span>
                    <span className="text-muted font-weight-bold">
                      In Proccess
                    </span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      $520
                    </span>
                    <span className="text-muted font-weight-bold">Paid</span>
                  </td>
                  <td>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      Intertico
                    </span>
                    <span className="text-muted font-weight-bold">
                      Web, UI/UX Design
                    </span>
                  </td>
                  <td>
                    <img
                      src={toAbsoluteUrl("/media/logos/stars.png")}
                      alt="image"
                      style={{ width: "5.5rem" }}
                    />
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Best Rated
                    </span>
                  </td>
                  <td className="pr-0 text-right">
                    <a
                      href="#"
                      className="btn btn-light-success font-weight-bolder font-size-sm"
                    >
                      View Offer
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
