import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankWithdrawals/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//bankWithdrawal
//BankWithdrawal


export function DeletesDialog({ show, onHide }) {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
      ids: bankWithdrawalsUIContext.ids,
      setIds: bankWithdrawalsUIContext.setIds,
      queryParams: bankWithdrawalsUIContext.queryParams,
    };
  }, [bankWithdrawalsUIContext]);

  // BankWithdrawals Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bankWithdrawals.actionsLoading }),
    shallowEqual
  );

  // if bankWithdrawals weren't selected we should close modal
  useEffect(() => {
    if (!bankWithdrawalsUIProps.ids || bankWithdrawalsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankWithdrawalsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBankWithdrawals = () => {
    // server request for deleting bankWithdrawal by selected ids
    dispatch(actions.deleteBankWithdrawals(bankWithdrawalsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankWithdrawals(bankWithdrawalsUIProps.queryParams)).then(
        () => {
          // clear selections list
          bankWithdrawalsUIProps.setIds([]);
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
          BankWithdrawals Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected bankWithdrawals?</span>
        )}
        {isLoading && <span>BankWithdrawal are deleting...</span>}
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
            onClick={deleteBankWithdrawals}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
