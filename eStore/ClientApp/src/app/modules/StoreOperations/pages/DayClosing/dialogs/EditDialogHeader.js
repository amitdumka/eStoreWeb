import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//dayClosing
//DayClosing

export function EditDialogHeader({ id }) {
  // DayClosings Redux state
  const { dayClosingForEdit, actionsLoading } = useSelector(
    (state) => ({
      dayClosingForEdit: state.dayClosings.dayClosingForEdit,
      actionsLoading: state.dayClosings.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New DayClosing Payment";
    if (dayClosingForEdit && id) {
      _title = `Edit DayClosing Payment '${dayClosingForEdit.account}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dayClosingForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
