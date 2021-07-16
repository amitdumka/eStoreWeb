import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//billPayment
//BillPayment


const selectedBillPayments = (entities, ids) => {
  const _billPayments = [];
  ids.forEach((id) => {
    const billPayment = entities.find((el) => el.id === id);
    if (billPayment) {
      _billPayments.push(billPayment);
    }
  });
  return _billPayments;
};

export function FetchDialog({ show, onHide }) {
  // BillPayments UI Context
  const billPaymentsUIContext = useUIContext();
  const billPaymentsUIProps = useMemo(() => {
    return {
      ids: billPaymentsUIContext.ids,
    };
  }, [billPaymentsUIContext]);

  // BillPayments Redux state
  const { billPayments } = useSelector(
    (state) => ({
      billPayments: selectedBillPayments(
        state.billPayments.entities,
        billPaymentsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if billPayments weren't selected we should close modal
  useEffect(() => {
    if (!billPaymentsUIProps.ids || billPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billPaymentsUIProps.ids]);

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
            {billPayments.map((billPayment) => (
              <tr key={`id${billPayment.id}`}>
                <td>{billPayment.id}</td>
                <td>
                  <span className="ml-3">
                    {billPayment.lastName}, {billPayment.firstName}
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
