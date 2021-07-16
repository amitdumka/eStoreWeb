import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//cashReceipt
//CashReceipt


const selectedCashReceipts = (entities, ids) => {
  const _cashReceipts = [];
  ids.forEach((id) => {
    const cashReceipt = entities.find((el) => el.id === id);
    if (cashReceipt) {
      _cashReceipts.push(cashReceipt);
    }
  });
  return _cashReceipts;
};

export function FetchDialog({ show, onHide }) {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      ids: cashReceiptsUIContext.ids,
    };
  }, [cashReceiptsUIContext]);

  // CashReceipts Redux state
  const { cashReceipts } = useSelector(
    (state) => ({
      cashReceipts: selectedCashReceipts(
        state.cashReceipts.entities,
        cashReceiptsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if cashReceipts weren't selected we should close modal
  useEffect(() => {
    if (!cashReceiptsUIProps.ids || cashReceiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashReceiptsUIProps.ids]);

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
            {cashReceipts.map((cashReceipt) => (
              <tr key={`id${cashReceipt.id}`}>
                <td>{cashReceipt.id}</td>
                <td>
                  <span className="ml-3">
                    {cashReceipt.lastName}, {cashReceipt.firstName}
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
