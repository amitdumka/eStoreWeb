import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//duesList
//DuesList

export function EditDialogHeader({ id }) {
  // DuesLists Redux state
  const { duesListForEdit, actionsLoading } = useSelector(
    (state) => ({
      duesListForEdit: state.duesLists.duesListForEdit,
      actionsLoading: state.duesLists.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New DuesList";
    if (duesListForEdit && id) {
      _title = `Edit duesList '${duesListForEdit.firstName} ${duesListForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [duesListForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
