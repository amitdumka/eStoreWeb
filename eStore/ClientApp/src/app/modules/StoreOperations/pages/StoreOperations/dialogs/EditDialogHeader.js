import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import InformSnackbars from "../../../../../../_estore/_uis/Inform";

//attendance
//Attendance

export function EditDialogHeader({ id ,titleName}) {
  // Attendances Redux state
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.attendances.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title 
  useEffect(() => {
    let _title = id ? `Edit ${titleName}` : "New "+titleName;
    
    setTitle(_title);
    // eslint-disable-next-line
  }, [actionsLoading]);

  return (
    <>

      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
