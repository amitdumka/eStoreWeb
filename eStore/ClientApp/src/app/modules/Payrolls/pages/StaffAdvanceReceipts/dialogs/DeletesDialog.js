import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StaffAdvanceReceipts/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//staffAdvanceReceipt
//StaffAdvanceReceipt


export function DeletesDialog({ show, onHide }) {
  // StaffAdvanceReceipts UI Context
  const staffAdvanceReceiptsUIContext = useUIContext();
  const staffAdvanceReceiptsUIProps = useMemo(() => {
    return {
      ids: staffAdvanceReceiptsUIContext.ids,
      setIds: staffAdvanceReceiptsUIContext.setIds,
      queryParams: staffAdvanceReceiptsUIContext.queryParams,
    };
  }, [staffAdvanceReceiptsUIContext]);

  // StaffAdvanceReceipts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.staffAdvanceReceipts.actionsLoading }),
    shallowEqual
  );

  // if staffAdvanceReceipts weren't selected we should close modal
  useEffect(() => {
    if (!staffAdvanceReceiptsUIProps.ids || staffAdvanceReceiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffAdvanceReceiptsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteStaffAdvanceReceipts = () => {
    // server request for deleting staffAdvanceReceipt by selected ids
    dispatch(actions.deleteStaffAdvanceReceipts(staffAdvanceReceiptsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchStaffAdvanceReceipts(staffAdvanceReceiptsUIProps.queryParams)).then(
        () => {
          // clear selections list
          staffAdvanceReceiptsUIProps.setIds([]);
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
          StaffAdvanceReceipts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected staffAdvanceReceipts?</span>
        )}
        {isLoading && <span>StaffAdvanceReceipt are deleting...</span>}
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
            onClick={deleteStaffAdvanceReceipts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
