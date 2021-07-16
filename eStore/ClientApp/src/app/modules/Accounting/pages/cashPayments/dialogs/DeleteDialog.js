import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/cashPayments/Actions";
import { useUIContext } from "../UIContext";

//cashPayment
//CashPayment

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      setIds: cashPaymentsUIContext.setIds,
      queryParams: cashPaymentsUIContext.queryParams,
    };
  }, [cashPaymentsUIContext]);

  // CashPayments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashPayments.actionsLoading }),
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

  const deleteCashPayment = () => {
    // server request for deleting cashPayment by id
    dispatch(actions.deleteCashPayment(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashPayments(cashPaymentsUIProps.queryParams));
      // clear selections list
      cashPaymentsUIProps.setIds([]);
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
          CashPayment Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this cashPayment?</span>
        )}
        {isLoading && <span>CashPayment is deleting...</span>}
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
            onClick={deleteCashPayment}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
