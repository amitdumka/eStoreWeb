import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankAccounts/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//bankAccount
//BankAccount


export function DeletesDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankAccounts.actionsLoading }),
    shallowEqual
  );

  // if bankAccounts weren't selected we should close modal
  useEffect(() => {
    if (!bankAccountsUIProps.ids || bankAccountsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankAccountsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBankAccounts = () => {
    // server request for deleting bankAccount by selected ids
    dispatch(actions.deleteBankAccounts(bankAccountsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankAccounts(bankAccountsUIProps.queryParams)).then(
        () => {
          // clear selections list
          bankAccountsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          BankAccounts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected bankAccounts?</span>
        )}
        {isLoading && <span>BankAccount are deleting...</span>}
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
            onClick={deleteBankAccounts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
