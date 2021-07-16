import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//Parties
//parties
//Party
//party


export function EditDialogHeader({ id }) {
  // Parties Redux state
  const { partyForEdit, actionsLoading } = useSelector(
    (state) => ({
      partyForEdit: state.parties.partyForEdit,
      actionsLoading: state.parties.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Party";
    if (partyForEdit && id) {
      _title = `Edit party '${partyForEdit.partyName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [partyForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
