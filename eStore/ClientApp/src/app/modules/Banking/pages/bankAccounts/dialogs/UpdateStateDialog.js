import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankAccounts/Actions";
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

export function UpdateStateDialog({ show, onHide }) {
  // BankAccounts UI Context
  const bankAccountsUIContext = useUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      ids: bankAccountsUIContext.ids,
      setIds: bankAccountsUIContext.setIds,
      queryParams: bankAccountsUIContext.queryParams,
    };
  }, [bankAccountsUIContext]);

  // BankAccounts Redux state
  const { bankAccounts, isLoading } = useSelector(
    (state) => ({
      bankAccounts: selectedBankAccounts(
        state.bankAccounts.entities,
        bankAccountsUIProps.ids
      ),
      isLoading: state.bankAccounts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!bankAccountsUIProps.ids || bankAccountsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankAccountsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update bankAccounts status by selected ids
    dispatch(actions.updateBankAccountsStatus(bankAccountsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchBankAccounts(bankAccountsUIProps.queryParams)).then(
          () => {
            // clear selections list
            bankAccountsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected bankAccounts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
