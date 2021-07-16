import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//cashPayment
//CashPayment


const selectedCashPayments = (entities, ids) => {
  const _cashPayments = [];
  ids.forEach((id) => {
    const cashPayment = entities.find((el) => el.id === id);
    if (cashPayment) {
      _cashPayments.push(cashPayment);
    }
  });
  return _cashPayments;
};

export function FetchDialog({ show, onHide }) {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      ids: cashPaymentsUIContext.ids,
    };
  }, [cashPaymentsUIContext]);

  // CashPayments Redux state
  const { cashPayments } = useSelector(
    (state) => ({
      cashPayments: selectedCashPayments(
        state.cashPayments.entities,
        cashPaymentsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if cashPayments weren't selected we should close modal
  useEffect(() => {
    if (!cashPaymentsUIProps.ids || cashPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashPaymentsUIProps.ids]);

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
            {cashPayments.map((cashPayment) => (
              <tr key={`id${cashPayment.id}`}>
                <td>{cashPayment.id}</td>
                <td>
                  <span className="ml-3">
                    {cashPayment.lastName}, {cashPayment.firstName}
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
