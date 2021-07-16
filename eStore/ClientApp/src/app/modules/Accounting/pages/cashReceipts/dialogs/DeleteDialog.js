import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/cashReceipts/Actions";
import { useUIContext } from "../UIContext";

//cashReceipt
//CashReceipt

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      setIds: cashReceiptsUIContext.setIds,
      queryParams: cashReceiptsUIContext.queryParams,
    };
  }, [cashReceiptsUIContext]);

  // CashReceipts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashReceipts.actionsLoading }),
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

  const deleteCashReceipt = () => {
    // server request for deleting cashReceipt by id
    dispatch(actions.deleteCashReceipt(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashReceipts(cashReceiptsUIProps.queryParams));
      // clear selections list
      cashReceiptsUIProps.setIds([]);
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
          CashReceipt Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this cashReceipt?</span>
        )}
        {isLoading && <span>CashReceipt is deleting...</span>}
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
            onClick={deleteCashReceipt}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
