import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billPayments/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//billPayment
//BillPayment


export function DeletesDialog({ show, onHide }) {
  // BillPayments UI Context
  const billPaymentsUIContext = useUIContext();
  const billPaymentsUIProps = useMemo(() => {
    return {
      ids: billPaymentsUIContext.ids,
      setIds: billPaymentsUIContext.setIds,
      queryParams: billPaymentsUIContext.queryParams,
    };
  }, [billPaymentsUIContext]);

  // BillPayments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.billPayments.actionsLoading }),
    shallowEqual
  );

  // if billPayments weren't selected we should close modal
  useEffect(() => {
    if (!billPaymentsUIProps.ids || billPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billPaymentsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBillPayments = () => {
    // server request for deleting billPayment by selected ids
    dispatch(actions.deleteBillPayments(billPaymentsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBillPayments(billPaymentsUIProps.queryParams)).then(
        () => {
          // clear selections list
          billPaymentsUIProps.setIds([]);
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
          BillPayments Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected billPayments?</span>
        )}
        {isLoading && <span>BillPayment are deleting...</span>}
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
            onClick={deleteBillPayments}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
