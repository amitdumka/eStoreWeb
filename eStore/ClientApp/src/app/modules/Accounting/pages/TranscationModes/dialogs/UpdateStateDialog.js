import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/TranscationModes/Actions";
import { useUIContext } from "../UIContext";

//transcationMode
//TranscationMode

const selectedTranscationModes = (entities, ids) => {
  const _transcationModes = [];
  ids.forEach((id) => {
    const transcationMode = entities.find((el) => el.id === id);
    if (transcationMode) {
      _transcationModes.push(transcationMode);
    }
  });
  return _transcationModes;
};

export function UpdateStateDialog({ show, onHide }) {
  // TranscationModes UI Context
  const transcationModesUIContext = useUIContext();
  const transcationModesUIProps = useMemo(() => {
    return {
      ids: transcationModesUIContext.ids,
      setIds: transcationModesUIContext.setIds,
      queryParams: transcationModesUIContext.queryParams,
    };
  }, [transcationModesUIContext]);

  // TranscationModes Redux state
  const { transcationModes, isLoading } = useSelector(
    (state) => ({
      transcationModes: selectedTranscationModes(
        state.transcationModes.entities,
        transcationModesUIProps.ids
      ),
      isLoading: state.transcationModes.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!transcationModesUIProps.ids || transcationModesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcationModesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update transcationModes status by selected ids
    dispatch(actions.updateTranscationModesStatus(transcationModesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchTranscationModes(transcationModesUIProps.queryParams)).then(
          () => {
            // clear selections list
            transcationModesUIProps.setIds([]);
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
          Status has been updated for selected transcationModes
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
            {transcationModes.map((transcationMode) => (
              <tr key={`id${transcationMode.id}`}>
                <td>{transcationMode.id}</td>
                
                <td>
                  <span className="ml-3">
                    {transcationMode.lastName}, {transcationMode.firstName}
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
