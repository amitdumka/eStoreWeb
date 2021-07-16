import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   ConnectionStatusCssClasses,
//   ConnectionStatusTitles,
// } from "../UIHelpers";
import { useUIContext } from "../UIContext";


//Connection
//connection


const selectedConnections = (entities, ids) => {
  const _connections = [];
  ids.forEach((id) => {
    const connection = entities.find((el) => el.id === id);
    if (connection) {
      _connections.push(connection);
    }
  });
  return _connections;
};

export function FetchDialog({ show, onHide }) {
  // Connections UI Context
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      ids: connectionsUIContext.ids,
    };
  }, [connectionsUIContext]);

  // Connections Redux state
  const { connections } = useSelector(
    (state) => ({
      connections: selectedConnections(
        state.connections.entities,
        connectionsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if connections weren't selected we should close modal
  useEffect(() => {
    if (!connectionsUIProps.ids || connectionsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionsUIProps.ids]);

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
            {connections.map((connection) => (
              <tr key={`id${connection.id}`}>
                <td>{connection.id}</td>
                <td>
                  <span className="ml-3">
                    {connection.lastName}, {connection.firstName}
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
