import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receipts/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//receipt
//Receipt


export function DeletesDialog({ show, onHide }) {
  // Receipts UI Context
  const receiptsUIContext = useUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      ids: receiptsUIContext.ids,
      setIds: receiptsUIContext.setIds,
      queryParams: receiptsUIContext.queryParams,
    };
  }, [receiptsUIContext]);

  // Receipts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.receipts.actionsLoading }),
    shallowEqual
  );

  // if receipts weren't selected we should close modal
  useEffect(() => {
    if (!receiptsUIProps.ids || receiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteReceipts = () => {
    // server request for deleting receipt by selected ids
    dispatch(actions.deleteReceipts(receiptsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchReceipts(receiptsUIProps.queryParams)).then(
        () => {
          // clear selections list
          receiptsUIProps.setIds([]);
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
          Receipts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected receipts?</span>
        )}
        {isLoading && <span>Receipt are deleting...</span>}
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
            onClick={deleteReceipts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
