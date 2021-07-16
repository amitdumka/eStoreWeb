import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankDeposits/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//bankDeposit
//BankDeposit


export function DeletesDialog({ show, onHide }) {
  // BankDeposits UI Context
  const bankDepositsUIContext = useUIContext();
  const bankDepositsUIProps = useMemo(() => {
    return {
      ids: bankDepositsUIContext.ids,
      setIds: bankDepositsUIContext.setIds,
      queryParams: bankDepositsUIContext.queryParams,
    };
  }, [bankDepositsUIContext]);

  // BankDeposits Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankDeposits.actionsLoading }),
    shallowEqual
  );

  // if bankDeposits weren't selected we should close modal
  useEffect(() => {
    if (!bankDepositsUIProps.ids || bankDepositsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankDepositsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBankDeposits = () => {
    // server request for deleting bankDeposit by selected ids
    dispatch(actions.deleteBankDeposits(bankDepositsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankDeposits(bankDepositsUIProps.queryParams)).then(
        () => {
          // clear selections list
          bankDepositsUIProps.setIds([]);
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
          BankDeposits Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected bankDeposits?</span>
        )}
        {isLoading && <span>BankDeposit are deleting...</span>}
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
            onClick={deleteBankDeposits}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
