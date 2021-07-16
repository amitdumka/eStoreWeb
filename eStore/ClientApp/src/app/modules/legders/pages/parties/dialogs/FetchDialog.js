import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//Parties
//parties
//Party
//party



const selectedParties = (entities, ids) => {
  const _parties = [];
  ids.forEach((id) => {
    const party = entities.find((el) => el.id === id);
    if (party) {
      _parties.push(party);
    }
  });
  return _parties;
};

export function FetchDialog({ show, onHide }) {
  // Parties UI Context
  const partiesUIContext = useUIContext();
  const partiesUIProps = useMemo(() => {
    return {
      ids: partiesUIContext.ids,
    };
  }, [partiesUIContext]);

  // Parties Redux state
  const { parties } = useSelector(
    (state) => ({
      parties: selectedParties(
        state.parties.entities,
        partiesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if parties weren't selected we should close modal
  useEffect(() => {
    if (!partiesUIProps.ids || partiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partiesUIProps.ids]);

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
            {parties.map((party) => (
              <tr key={`id${party.id}`}>
                <td>{party.id}</td>
                <td>
                  <span className="ml-3">
                    {party.lastName}, {party.firstName}
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
