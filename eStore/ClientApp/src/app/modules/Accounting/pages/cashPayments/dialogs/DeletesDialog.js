import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashPayments/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//cashPayment
//CashPayment


export function DeletesDialog({ show, onHide }) {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      ids: cashPaymentsUIContext.ids,
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

  // if cashPayments weren't selected we should close modal
  useEffect(() => {
    if (!cashPaymentsUIProps.ids || cashPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashPaymentsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCashPayments = () => {
    // server request for deleting cashPayment by selected ids
    dispatch(actions.deleteCashPayments(cashPaymentsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashPayments(cashPaymentsUIProps.queryParams)).then(
        () => {
          // clear selections list
          cashPaymentsUIProps.setIds([]);
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
          CashPayments Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected cashPayments?</span>
        )}
        {isLoading && <span>CashPayment are deleting...</span>}
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
            onClick={deleteCashPayments}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
