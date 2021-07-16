import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

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

export function FetchDialog({ show, onHide }) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      ids: attendancesUIContext.ids,
    };
  }, [attendancesUIContext]);

  // Attendances Redux state
  const { attendances } = useSelector(
    (state) => ({
      attendances: selectedAttendances(
        state.attendances.entities,
        attendancesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if attendances weren't selected we should close modal
  useEffect(() => {
    if (!attendancesUIProps.ids || attendancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendancesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
