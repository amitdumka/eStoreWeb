import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/Contacts/Actions";
import {useUIContext} from "../UIContext";

//contact
//Contact

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // Contacts UI Context
  const contactsUIContext = useUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      setIds: contactsUIContext.setIds,
      queryParams: contactsUIContext.queryParams
    };
  }, [contactsUIContext]);

  // Contacts Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.contacts.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteContact = () => {
    // server request for deleting contact by id
    dispatch(actions.deleteContact(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchContacts(contactsUIProps.queryParams));
      // clear selections list
      contactsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Contact Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this contact?</span>
        )}
        {isLoading && <span>Contact is deleting...</span>}
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
            onClick={deleteContact}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
