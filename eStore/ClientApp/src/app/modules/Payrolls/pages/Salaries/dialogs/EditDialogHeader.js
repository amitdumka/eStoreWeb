import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//salary
//Salary

export function EditDialogHeader({ id }) {
  // Salaries Redux state
  const { salaryForEdit, actionsLoading } = useSelector(
    (state) => ({
      salaryForEdit: state.salaries.salaryForEdit,
      actionsLoading: state.salaries.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Salary";
    if (salaryForEdit && id) {
      _title = `Edit salary '${salaryForEdit.firstName} ${salaryForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [salaryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
