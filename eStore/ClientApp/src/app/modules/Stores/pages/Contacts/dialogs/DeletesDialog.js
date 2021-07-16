import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Contacts/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//contact
//Contact


export function DeletesDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.contacts.actionsLoading }),
    shallowEqual
  );

  // if contacts weren't selected we should close modal
  useEffect(() => {
    if (!contactsUIProps.ids || contactsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteContacts = () => {
    // server request for deleting contact by selected ids
    dispatch(actions.deleteContacts(contactsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchContacts(contactsUIProps.queryParams)).then(
        () => {
          // clear selections list
          contactsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
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
          Contacts Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected contacts?</span>
        )}
        {isLoading && <span>Contact are deleting...</span>}
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
            onClick={deleteContacts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
