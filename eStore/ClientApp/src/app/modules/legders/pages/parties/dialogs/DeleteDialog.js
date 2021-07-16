import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/parties/Actions";
import {useUIContext} from "../UIContext";

///Parties
//parties
//Party
//party


// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // Parties UI Context
  const partiesUIContext = useUIContext();
  const partiesUIProps = useMemo(() => {
    return {
      setIds: partiesUIContext.setIds,
      queryParams: partiesUIContext.queryParams
    };
  }, [partiesUIContext]);

  // Parties Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.parties.actionsLoading }),
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

  const deleteParty = () => {
    // server request for deleting party by id
    dispatch(actions.deleteParty(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchParties(partiesUIProps.queryParams));
      // clear selections list
      partiesUIProps.setIds([]);
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
          Party Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this party?</span>
        )}
        {isLoading && <span>Party is deleting...</span>}
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
            onClick={deleteParty}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
