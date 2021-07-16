import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashDetails/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//cashDetail
//CashDetail


export function DeletesDialog({ show, onHide }) {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      ids: cashDetailsUIContext.ids,
      setIds: cashDetailsUIContext.setIds,
      queryParams: cashDetailsUIContext.queryParams,
    };
  }, [cashDetailsUIContext]);

  // CashDetails Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cashDetails.actionsLoading }),
    shallowEqual
  );

  // if cashDetails weren't selected we should close modal
  useEffect(() => {
    if (!cashDetailsUIProps.ids || cashDetailsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashDetailsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCashDetails = () => {
    // server request for deleting cashDetail by selected ids
    dispatch(actions.deleteCashDetails(cashDetailsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCashDetails(cashDetailsUIProps.queryParams)).then(
        () => {
          // clear selections list
          cashDetailsUIProps.setIds([]);
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
          CashDetails Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected cashDetails?</span>
        )}
        {isLoading && <span>CashDetail are deleting...</span>}
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
            onClick={deleteCashDetails}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
