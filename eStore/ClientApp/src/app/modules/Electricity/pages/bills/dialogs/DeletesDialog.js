import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bills/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//bill
//Bill


export function DeletesDialog({ show, onHide }) {
  // Bills UI Context
  const billsUIContext = useUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
      setIds: billsUIContext.setIds,
      queryParams: billsUIContext.queryParams,
    };
  }, [billsUIContext]);

  // Bills Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.bills.actionsLoading }),
    shallowEqual
  );

  // if bills weren't selected we should close modal
  useEffect(() => {
    if (!billsUIProps.ids || billsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBills = () => {
    // server request for deleting bill by selected ids
    dispatch(actions.deleteBills(billsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBills(billsUIProps.queryParams)).then(
        () => {
          // clear selections list
          billsUIProps.setIds([]);
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
          Bills Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected bills?</span>
        )}
        {isLoading && <span>Bill are deleting...</span>}
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
            onClick={deleteBills}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
