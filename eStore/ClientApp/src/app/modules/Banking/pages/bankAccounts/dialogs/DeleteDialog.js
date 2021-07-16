import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/bankAccounts/Actions";
import {useUIContext} from "../UIContext";

//bankAccount
//BankAccount

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // BankAccounts UI Context
  const bankAccountsUIContext = useUIContext();
  const bankAccountsUIProps = useMemo(() => {
    return {
      setIds: bankAccountsUIContext.setIds,
      queryParams: bankAccountsUIContext.queryParams
    };
  }, [bankAccountsUIContext]);

  // BankAccounts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankAccounts.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBankAccount = () => {
    // server request for deleting bankAccount by id
    dispatch(actions.deleteBankAccount(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankAccounts(bankAccountsUIProps.queryParams));
      // clear selections list
      bankAccountsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          BankAccount Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this bankAccount?</span>
        )}
        {isLoading && <span>BankAccount is deleting...</span>}
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
            onClick={deleteBankAccount}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
