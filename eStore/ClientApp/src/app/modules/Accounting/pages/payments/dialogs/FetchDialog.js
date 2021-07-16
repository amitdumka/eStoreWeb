import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//payment
//Payment


const selectedPayments = (entities, ids) => {
  const _payments = [];
  ids.forEach((id) => {
    const payment = entities.find((el) => el.id === id);
    if (payment) {
      _payments.push(payment);
    }
  });
  return _payments;
};

export function FetchDialog({ show, onHide }) {
  // Payments UI Context
  const paymentsUIContext = useUIContext();
  const paymentsUIProps = useMemo(() => {
    return {
      ids: paymentsUIContext.ids,
    };
  }, [paymentsUIContext]);

  // Payments Redux state
  const { payments } = useSelector(
    (state) => ({
      payments: selectedPayments(
        state.payments.entities,
        paymentsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if payments weren't selected we should close modal
  useEffect(() => {
    if (!paymentsUIProps.ids || paymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentsUIProps.ids]);

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
            {payments.map((payment) => (
              <tr key={`id${payment.id}`}>
                <td>{payment.id}</td>
                <td>
                  <span className="ml-3">
                    {payment.lastName}, {payment.firstName}
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
