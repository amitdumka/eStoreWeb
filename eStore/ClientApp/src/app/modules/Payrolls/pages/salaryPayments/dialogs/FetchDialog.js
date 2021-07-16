import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//salaryPayment
//SalaryPayment


const selectedSalaryPayments = (entities, ids) => {
  const _salaryPayments = [];
  ids.forEach((id) => {
    const salaryPayment = entities.find((el) => el.id === id);
    if (salaryPayment) {
      _salaryPayments.push(salaryPayment);
    }
  });
  return _salaryPayments;
};

export function FetchDialog({ show, onHide }) {
  // SalaryPayments UI Context
  const salaryPaymentsUIContext = useUIContext();
  const salaryPaymentsUIProps = useMemo(() => {
    return {
      ids: salaryPaymentsUIContext.ids,
    };
  }, [salaryPaymentsUIContext]);

  // SalaryPayments Redux state
  const { salaryPayments } = useSelector(
    (state) => ({
      salaryPayments: selectedSalaryPayments(
        state.salaryPayments.entities,
        salaryPaymentsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if salaryPayments weren't selected we should close modal
  useEffect(() => {
    if (!salaryPaymentsUIProps.ids || salaryPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryPaymentsUIProps.ids]);

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
            {salaryPayments.map((salaryPayment) => (
              <tr key={`id${salaryPayment.id}`}>
                <td>{salaryPayment.id}</td>
                <td>
                  <span className="ml-3">
                    {salaryPayment.lastName}, {salaryPayment.firstName}
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
