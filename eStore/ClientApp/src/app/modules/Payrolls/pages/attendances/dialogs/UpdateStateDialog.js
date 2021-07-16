import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/attendances/Actions";
import { useUIContext } from "../UIContext";
//attendance
//Attendance

const selectedAttendances = (entities, ids) => {
  const _attendances = [];
  ids.forEach((id) => {
    const attendance = entities.find((el) => el.id === id);
    if (attendance) {
      _attendances.push(attendance);
    }
  });
  return _attendances;
};

export function UpdateStateDialog({ show, onHide }) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      ids: attendancesUIContext.ids,
      setIds: attendancesUIContext.setIds,
      queryParams: attendancesUIContext.queryParams,
    };
  }, [attendancesUIContext]);

  // Attendances Redux state
  const { attendances, isLoading } = useSelector(
    (state) => ({
      attendances: selectedAttendances(
        state.attendances.entities,
        attendancesUIProps.ids
      ),
      isLoading: state.attendances.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!attendancesUIProps.ids || attendancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendancesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update attendances status by selected ids
    dispatch(actions.updateAttendancesStatus(attendancesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchAttendances(attendancesUIProps.queryParams)).then(
          () => {
            // clear selections list
            attendancesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected attendances
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={`id${attendance.id}`}>
                <td>{attendance.id}</td>
                
                <td>
                  <span className="ml-3">
                    {attendance.lastName}, {attendance.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
