import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//bankWithdrawal
//BankWithdrawal


const selectedBankWithdrawals = (entities, ids) => {
  const _bankWithdrawals = [];
  ids.forEach((id) => {
    const bankWithdrawal = entities.find((el) => el.id === id);
    if (bankWithdrawal) {
      _bankWithdrawals.push(bankWithdrawal);
    }
  });
  return _bankWithdrawals;
};

export function FetchDialog({ show, onHide }) {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
      ids: bankWithdrawalsUIContext.ids,
    };
  }, [bankWithdrawalsUIContext]);

  // BankWithdrawals Redux state
  const { bankWithdrawals } = useSelector(
    (state) => ({
      bankWithdrawals: selectedBankWithdrawals(
        state.bankWithdrawals.entities,
        bankWithdrawalsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if bankWithdrawals weren't selected we should close modal
  useEffect(() => {
    if (!bankWithdrawalsUIProps.ids || bankWithdrawalsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankWithdrawalsUIProps.ids]);

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
            {bankWithdrawals.map((bankWithdrawal) => (
              <tr key={`id${bankWithdrawal.id}`}>
                <td>{bankWithdrawal.id}</td>
                <td>
                  <span className="ml-3">
                    {bankWithdrawal.lastName}, {bankWithdrawal.firstName}
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
