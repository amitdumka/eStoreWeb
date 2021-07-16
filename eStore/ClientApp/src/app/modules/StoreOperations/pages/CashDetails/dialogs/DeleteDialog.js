import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/cashDetails/Actions";
import {useUIContext} from "../UIContext";

//cashDetail
//CashDetail

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      setIds: cashDetailsUIContext.setIds,
      queryParams: cashDetailsUIContext.queryParams
    };
  }, [cashDetailsUIContext]);

  // CashDetails Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashDetails.actionsLoading }),
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

  const deleteCashDetail = () => {
    // server request for deleting cashDetail by id
    dispatch(actions.deleteCashDetail(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashDetails(cashDetailsUIProps.queryParams));
      // clear selections list
      cashDetailsUIProps.setIds([]);
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
          CashDetail Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this cashDetail?</span>
        )}
        {isLoading && <span>CashDetail is deleting...</span>}
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
            onClick={deleteCashDetail}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
