import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/connections/Actions";
import {useUIContext} from "../UIContext";


//Connection
//connection

// Delete particular record.
export function DeleteDialog({ id, show, onHide }) {
  // Connections UI Context
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      setIds: connectionsUIContext.setIds,
      queryParams: connectionsUIContext.queryParams
    };
  }, [connectionsUIContext]);

  // Connections Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.connections.actionsLoading }),
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

  const deleteConnection = () => {
    // server request for deleting connection by id
    dispatch(actions.deleteConnection(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchConnections(connectionsUIProps.queryParams));
      // clear selections list
      connectionsUIProps.setIds([]);
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
          Connection Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this connection?</span>
        )}
        {isLoading && <span>Connection is deleting...</span>}
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
            onClick={deleteConnection}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
