import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/connections/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records

//Connection
//connection

export function DeletesDialog({ show, onHide }) {
  // Connections UI Context
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      ids: connectionsUIContext.ids,
      setIds: connectionsUIContext.setIds,
      queryParams: connectionsUIContext.queryParams,
    };
  }, [connectionsUIContext]);

  // Connections Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.connections.actionsLoading }),
    shallowEqual
  );

  // if connections weren't selected we should close modal
  useEffect(() => {
    if (!connectionsUIProps.ids || connectionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteConnections = () => {
    // server request for deleting connection by selected ids
    dispatch(actions.deleteConnections(connectionsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchConnections(connectionsUIProps.queryParams)).then(
        () => {
          // clear selections list
          connectionsUIProps.setIds([]);
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
          Connections Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected connections?</span>
        )}
        {isLoading && <span>Connection are deleting...</span>}
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
            onClick={deleteConnections}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
