import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//bankDeposit
//BankDeposit


const selectedBankDeposits = (entities, ids) => {
  const _bankDeposits = [];
  ids.forEach((id) => {
    const bankDeposit = entities.find((el) => el.id === id);
    if (bankDeposit) {
      _bankDeposits.push(bankDeposit);
    }
  });
  return _bankDeposits;
};

export function FetchDialog({ show, onHide }) {
  // BankDeposits UI Context
  const bankDepositsUIContext = useUIContext();
  const bankDepositsUIProps = useMemo(() => {
    return {
      ids: bankDepositsUIContext.ids,
    };
  }, [bankDepositsUIContext]);

  // BankDeposits Redux state
  const { bankDeposits } = useSelector(
    (state) => ({
      bankDeposits: selectedBankDeposits(
        state.bankDeposits.entities,
        bankDepositsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if bankDeposits weren't selected we should close modal
  useEffect(() => {
    if (!bankDepositsUIProps.ids || bankDepositsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankDepositsUIProps.ids]);

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
            {bankDeposits.map((bankDeposit) => (
              <tr key={`id${bankDeposit.id}`}>
                <td>{bankDeposit.id}</td>
                <td>
                  <span className="ml-3">
                    {bankDeposit.lastName}, {bankDeposit.firstName}
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
