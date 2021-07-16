import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function EditDialogHeader({ id }) {
  // Employees Redux state
  const { employeeForEdit, actionsLoading } = useSelector(
    (state) => ({
      employeeForEdit: state.employees.employeeForEdit,
      actionsLoading: state.employees.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Employee";
    if (employeeForEdit && id) {
      _title = `Edit employee '${employeeForEdit.firstName} ${employeeForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [employeeForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
