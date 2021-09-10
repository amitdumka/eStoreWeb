import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export const HeaderSetting={
  title:" Rent Payment",
  editColumnData:"",
};

export function EditDialogHeader({ id }) {
  // Redux state
  const { rentForEdit, actionsLoading } = useSelector(
    (state) => ({
      rentForEdit: state.rents.rentForEdit,
      actionsLoading: state.rents.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title 
  useEffect(() => {
    let _title = id ? "" : `New ${HeaderSetting.title}`;
    if (rentForEdit && id) {
      _title = `Edit ${HeaderSetting.title} '${rentForEdit.account}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [rentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
