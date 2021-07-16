import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

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

export function FetchDialog({ show, onHide }) {
  // TranscationModes UI Context
  const transcationModesUIContext = useUIContext();
  const transcationModesUIProps = useMemo(() => {
    return {
      ids: transcationModesUIContext.ids,
    };
  }, [transcationModesUIContext]);

  // TranscationModes Redux state
  const { transcationModes } = useSelector(
    (state) => ({
      transcationModes: selectedTranscationModes(
        state.transcationModes.entities,
        transcationModesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if transcationModes weren't selected we should close modal
  useEffect(() => {
    if (!transcationModesUIProps.ids || transcationModesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcationModesUIProps.ids]);

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
