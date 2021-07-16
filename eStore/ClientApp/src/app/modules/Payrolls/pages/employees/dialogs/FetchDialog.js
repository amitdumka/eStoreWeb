import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   EmployeeStatusCssClasses,
//   EmployeeStatusTitles,
// } from "../UIHelpers";
import { useUIContext } from "../UIContext";

const selectedEmployees = (entities, ids) => {
  const _employees = [];
  ids.forEach((id) => {
    const employee = entities.find((el) => el.id === id);
    if (employee) {
      _employees.push(employee);
    }
  });
  return _employees;
};

export function FetchDialog({ show, onHide }) {
  // Employees UI Context
  const employeesUIContext = useUIContext();
  const employeesUIProps = useMemo(() => {
    return {
      ids: employeesUIContext.ids,
    };
  }, [employeesUIContext]);

  // Employees Redux state
  const { employees } = useSelector(
    (state) => ({
      employees: selectedEmployees(
        state.employees.entities,
        employeesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if employees weren't selected we should close modal
  useEffect(() => {
    if (!employeesUIProps.ids || employeesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={`id${employee.id}`}>
                <td>{employee.id}</td>
                <td>
                  <span className="ml-3">
                    {employee.lastName}, {employee.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
