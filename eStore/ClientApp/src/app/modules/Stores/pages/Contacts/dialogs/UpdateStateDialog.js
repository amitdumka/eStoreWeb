import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Contacts/Actions";
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

export function UpdateStateDialog({ show, onHide }) {
  // Contacts UI Context
  const contactsUIContext = useUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      ids: contactsUIContext.ids,
      setIds: contactsUIContext.setIds,
      queryParams: contactsUIContext.queryParams,
    };
  }, [contactsUIContext]);

  // Contacts Redux state
  const { contacts, isLoading } = useSelector(
    (state) => ({
      contacts: selectedContacts(
        state.contacts.entities,
        contactsUIProps.ids
      ),
      isLoading: state.contacts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!contactsUIProps.ids || contactsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update contacts status by selected ids
    dispatch(actions.updateContactsStatus(contactsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchContacts(contactsUIProps.queryParams)).then(
          () => {
            // clear selections list
            contactsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
