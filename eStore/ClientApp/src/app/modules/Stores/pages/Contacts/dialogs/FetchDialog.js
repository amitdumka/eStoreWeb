import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//contact
//Contact


const selectedContacts = (entities, ids) => {
  const _contacts = [];
  ids.forEach((id) => {
    const contact = entities.find((el) => el.id === id);
    if (contact) {
      _contacts.push(contact);
    }
  });
  return _contacts;
};

export function FetchDialog({ show, onHide }) {
  // Contacts UI Context
  const contactsUIContext = useUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      ids: contactsUIContext.ids,
    };
  }, [contactsUIContext]);

  // Contacts Redux state
  const { contacts } = useSelector(
    (state) => ({
      contacts: selectedContacts(
        state.contacts.entities,
        contactsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if contacts weren't selected we should close modal
  useEffect(() => {
    if (!contactsUIProps.ids || contactsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={`id${contact.id}`}>
                <td>{contact.id}</td>
                <td>
                  <span className="ml-3">
                    {contact.lastName}, {contact.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
