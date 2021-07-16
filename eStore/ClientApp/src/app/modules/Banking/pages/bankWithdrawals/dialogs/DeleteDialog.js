import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/bankWithdrawals/Actions";
import { useUIContext } from "../UIContext";

//bankWithdrawal
//BankWithdrawal

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBankWithdrawal = () => {
    // server request for deleting bankWithdrawal by id
    dispatch(actions.deleteBankWithdrawal(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankWithdrawals(bankWithdrawalsUIProps.queryParams));
      // clear selections list
      bankWithdrawalsUIProps.setIds([]);
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
          BankWithdrawal Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this bankWithdrawal?</span>
        )}
        {isLoading && <span>BankWithdrawal is deleting...</span>}
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
            onClick={deleteBankWithdrawal}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
