import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//salary
//Salary


const selectedSalaries = (entities, ids) => {
  const _salaries = [];
  ids.forEach((id) => {
    const salary = entities.find((el) => el.id === id);
    if (salary) {
      _salaries.push(salary);
    }
  });
  return _salaries;
};

export function FetchDialog({ show, onHide }) {
  // Salaries UI Context
  const salariesUIContext = useUIContext();
  const salariesUIProps = useMemo(() => {
    return {
      ids: salariesUIContext.ids,
    };
  }, [salariesUIContext]);

  // Salaries Redux state
  const { salaries } = useSelector(
    (state) => ({
      salaries: selectedSalaries(
        state.salaries.entities,
        salariesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if salaries weren't selected we should close modal
  useEffect(() => {
    if (!salariesUIProps.ids || salariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salariesUIProps.ids]);

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
            {salaries.map((salary) => (
              <tr key={`id${salary.id}`}>
                <td>{salary.id}</td>
                <td>
                  <span className="ml-3">
                    {salary.lastName}, {salary.firstName}
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
