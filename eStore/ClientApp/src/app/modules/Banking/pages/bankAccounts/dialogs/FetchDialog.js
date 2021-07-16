import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//bankAccount
//BankAccount


const selectedBankAccounts = (entities, ids) => {
  const _bankAccounts = [];
  ids.forEach((id) => {
    const bankAccount = entities.find((el) => el.id === id);
    if (bankAccount) {
      _bankAccounts.push(bankAccount);
    }
  });
  return _bankAccounts;
};

export function FetchDialog({ show, onHide }) {
  // BankAccounts UI Context
  const bankAccountsUIContext = useUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      ids: bankAccountsUIContext.ids,
    };
  }, [bankAccountsUIContext]);

  // BankAccounts Redux state
  const { bankAccounts } = useSelector(
    (state) => ({
      bankAccounts: selectedBankAccounts(
        state.bankAccounts.entities,
        bankAccountsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if bankAccounts weren't selected we should close modal
  useEffect(() => {
    if (!bankAccountsUIProps.ids || bankAccountsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankAccountsUIProps.ids]);

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
            {bankAccounts.map((bankAccount) => (
              <tr key={`id${bankAccount.id}`}>
                <td>{bankAccount.id}</td>
                <td>
                  <span className="ml-3">
                    {bankAccount.lastName}, {bankAccount.firstName}
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
