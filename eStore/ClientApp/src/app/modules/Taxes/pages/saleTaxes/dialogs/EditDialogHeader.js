import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//SaleTaxes
//saleTaxes
//SaleTax
//saleTax


export function EditDialogHeader({ id }) {
  // SaleTaxes Redux state
  const { saleTaxForEdit, actionsLoading } = useSelector(
    (state) => ({
      saleTaxForEdit: state.saleTaxes.saleTaxForEdit,
      actionsLoading: state.saleTaxes.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New SaleTax";
    if (saleTaxForEdit && id) {
      _title = `Edit saleTax '${saleTaxForEdit.saleTaxName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [saleTaxForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
