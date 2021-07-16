import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//endOfDay
//EndOfDay

export function EditDialogHeader({ id }) {
  // EndOfDays Redux state
  const { endOfDayForEdit, actionsLoading } = useSelector(
    (state) => ({
      endOfDayForEdit: state.endOfDays.endOfDayForEdit,
      actionsLoading: state.endOfDays.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New EndOfDay Payment";
    if (endOfDayForEdit && id) {
      _title = `Edit EndOfDay Payment '${endOfDayForEdit.account}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [endOfDayForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
