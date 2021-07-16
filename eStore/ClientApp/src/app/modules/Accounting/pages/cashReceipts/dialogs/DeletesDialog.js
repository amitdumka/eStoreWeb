import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashReceipts/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//cashReceipt
//CashReceipt


export function DeletesDialog({ show, onHide }) {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      ids: cashReceiptsUIContext.ids,
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

  // if cashReceipts weren't selected we should close modal
  useEffect(() => {
    if (!cashReceiptsUIProps.ids || cashReceiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashReceiptsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCashReceipts = () => {
    // server request for deleting cashReceipt by selected ids
    dispatch(actions.deleteCashReceipts(cashReceiptsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashReceipts(cashReceiptsUIProps.queryParams)).then(
        () => {
          // clear selections list
          cashReceiptsUIProps.setIds([]);
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
          CashReceipts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected cashReceipts?</span>
        )}
        {isLoading && <span>CashReceipt are deleting...</span>}
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
            onClick={deleteCashReceipts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
