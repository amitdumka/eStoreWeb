import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Contacts/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//contact
//Contact

export function EditDialog({ id, show, onHide }) {
  // Contacts UI Context
  const contactsUIContext = useUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      initContact: contactsUIContext.initContact,
    };
  }, [contactsUIContext]);

  // Contacts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, contactForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.contacts.actionsLoading,
      contactForEdit: state.contacts.contactForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Contact by id
    dispatch(actions.fetchContact(id));

  }, [id, dispatch]);

  // server request for saving contact
  const saveContact = (contact) => {
    if (!id) {
      // server request for creating contact
      dispatch(actions.createContact(contact)).then(() => onHide());
    } else {
      // server request for updating contact
      dispatch(actions.updateContact(contact)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EditDialogHeader id={id} />
      <EditForm
        saveContact={saveContact}
        actionsLoading={actionsLoading}
        contact={contactForEdit || contactsUIProps.initContact}
        onHide={onHide}
      />
    </Modal>
  );
}
