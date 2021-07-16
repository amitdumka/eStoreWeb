import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/StaffAdvanceReceipts/Actions";
import {useUIContext} from "../UIContext";

//staffAdvanceReceipt
//StaffAdvanceReceipt

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // StaffAdvanceReceipts UI Context
  const staffAdvanceReceiptsUIContext = useUIContext();
  const staffAdvanceReceiptsUIProps = useMemo(() => {
    return {
      setIds: staffAdvanceReceiptsUIContext.setIds,
      queryParams: staffAdvanceReceiptsUIContext.queryParams
    };
  }, [staffAdvanceReceiptsUIContext]);

  // StaffAdvanceReceipts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.staffAdvanceReceipts.actionsLoading }),
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

  const deleteStaffAdvanceReceipt = () => {
    // server request for deleting staffAdvanceReceipt by id
    dispatch(actions.deleteStaffAdvanceReceipt(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchStaffAdvanceReceipts(staffAdvanceReceiptsUIProps.queryParams));
      // clear selections list
      staffAdvanceReceiptsUIProps.setIds([]);
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
          StaffAdvanceReceipt Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this staffAdvanceReceipt?</span>
        )}
        {isLoading && <span>StaffAdvanceReceipt is deleting...</span>}
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
            onClick={deleteStaffAdvanceReceipt}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
