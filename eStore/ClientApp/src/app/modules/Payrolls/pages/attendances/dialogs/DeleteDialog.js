import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/attendances/Actions";
import {useUIContext} from "../UIContext";

//attendance
//Attendance

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      setIds: attendancesUIContext.setIds,
      queryParams: attendancesUIContext.queryParams
    };
  }, [attendancesUIContext]);

  // Attendances Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.attendances.actionsLoading }),
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

  const deleteAttendance = () => {
    // server request for deleting attendance by id
    dispatch(actions.deleteAttendance(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAttendances(attendancesUIProps.queryParams));
      // clear selections list
      attendancesUIProps.setIds([]);
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
          Attendance Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this attendance?</span>
        )}
        {isLoading && <span>Attendance is deleting...</span>}
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
            onClick={deleteAttendance}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
