/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Dropdown } from "react-bootstrap";
//import { toAbsoluteUrl } from "../../../_helpers";
import { DropdownCustomToggler, DropdownEmpMenu } from "../../dropdowns";
export function EmpInfoWidget({ className, empInfo, topSalesman }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder text-dark">
            Employee(s)
          </h3>

          <div className="card-toolbar">
            <div className="text-danger font-weight-bold text-hover-primary font-size-lg mb-1">
              Top Salesman [Y/M/T]:
              <span className="text-success">
                {" "}
                {topSalesman[0]} / {topSalesman[1]} / {topSalesman[2]}
              </span>{" "}
            </div>
          </div>
          <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-ver" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownEmpMenu />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Body */}
        <div className="card-body pt-0">
          {empInfo.length > 0 ? (
            empInfo.map((item, index) => (
              <div className="mb-6" key={index}>
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                    <div className="d-flex flex-column align-items-right py-2 w-75">
                      <a
                        href="#"
                        className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                      >
                        {item.name}
                      </a>

                      <span className="text-primary font-weight-bold font-size-lg">
                        Present/Absent : {item.presentDays} {}/ {}{" "}
                        {item.absentDays}
                        {"  "}
                        {item.isSalesman && (
                          <span className="text-success font-weight-bold">
                            Sale/Bill : {item.totalSale} {}/ {} {item.noOfBills}
                            {"  "} Ratio : {item.ratio}
                          </span>
                        )}
                      </span>
                    </div>
                    {item.present === "Present" && (
                      <span className="label label-lg label-light-primary label-inline font-weight-bold py-4">
                        {item.present}
                      </span>
                    )}
                    {item.present === "Absent" && (
                      <span className="label label-lg label-light-danger label-inline font-weight-bold py-4">
                        {item.present}
                      </span>
                    )}
                    {item.present === "Half Day Leave" && (
                      <span className="label label-lg label-light-warning label-inline font-weight-bold py-4">
                        {item.present}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              text-dark-75
              font-weight-bold
              text-hover-primary
              font-size-lg
              mb-1
            >
              Today No Employees are present.{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
