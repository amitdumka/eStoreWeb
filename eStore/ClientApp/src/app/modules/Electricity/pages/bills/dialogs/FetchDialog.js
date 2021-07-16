import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//bill
//Bill


const selectedBills = (entities, ids) => {
  const _bills = [];
  ids.forEach((id) => {
    const bill = entities.find((el) => el.id === id);
    if (bill) {
      _bills.push(bill);
    }
  });
  return _bills;
};

export function FetchDialog({ show, onHide }) {
  // Bills UI Context
  const billsUIContext = useUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
    };
  }, [billsUIContext]);

  // Bills Redux state
  const { bills } = useSelector(
    (state) => ({
      bills: selectedBills(
        state.bills.entities,
        billsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if bills weren't selected we should close modal
  useEffect(() => {
    if (!billsUIProps.ids || billsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billsUIProps.ids]);

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
            {bills.map((bill) => (
              <tr key={`id${bill.id}`}>
                <td>{bill.id}</td>
                <td>
                  <span className="ml-3">
                    {bill.lastName}, {bill.firstName}
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
