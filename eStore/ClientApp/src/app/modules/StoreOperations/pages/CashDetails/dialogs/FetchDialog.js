import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//cashDetail
//CashDetail


const selectedCashDetails = (entities, ids) => {
  const _cashDetails = [];
  ids.forEach((id) => {
    const cashDetail = entities.find((el) => el.id === id);
    if (cashDetail) {
      _cashDetails.push(cashDetail);
    }
  });
  return _cashDetails;
};

export function FetchDialog({ show, onHide }) {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      ids: cashDetailsUIContext.ids,
    };
  }, [cashDetailsUIContext]);

  // CashDetails Redux state
  const { cashDetails } = useSelector(
    (state) => ({
      cashDetails: selectedCashDetails(
        state.cashDetails.entities,
        cashDetailsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if cashDetails weren't selected we should close modal
  useEffect(() => {
    if (!cashDetailsUIProps.ids || cashDetailsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashDetailsUIProps.ids]);

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
            {cashDetails.map((cashDetail) => (
              <tr key={`id${cashDetail.id}`}>
                <td>{cashDetail.id}</td>
                <td>
                  <span className="ml-3">
                    {cashDetail.lastName}, {cashDetail.firstName}
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
