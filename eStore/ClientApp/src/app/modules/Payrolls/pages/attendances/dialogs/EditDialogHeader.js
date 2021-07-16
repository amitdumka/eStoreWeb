import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//attendance
//Attendance

export function EditDialogHeader({ id }) {
  // Attendances Redux state
  const { attendanceForEdit, actionsLoading } = useSelector(
    (state) => ({
      attendanceForEdit: state.attendances.attendanceForEdit,
      actionsLoading: state.attendances.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Attendance";
    if (attendanceForEdit && id) {
      _title = `Edit attendance '${attendanceForEdit.firstName} ${attendanceForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [attendanceForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
