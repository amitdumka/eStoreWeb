import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   LedgerTypeStatusCssClasses,
//   LedgerTypeStatusTitles,
// } from "../UIHelpers";
import { useUIContext } from "../UIContext";

//ledgerType
//LedgerType


const selectedLedgerTypes = (entities, ids) => {
  const _ledgerTypes = [];
  ids.forEach((id) => {
    const ledgerType = entities.find((el) => el.id === id);
    if (ledgerType) {
      _ledgerTypes.push(ledgerType);
    }
  });
  return _ledgerTypes;
};

export function FetchDialog({ show, onHide }) {
  // LedgerTypes UI Context
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      ids: ledgerTypesUIContext.ids,
    };
  }, [ledgerTypesUIContext]);

  // LedgerTypes Redux state
  const { ledgerTypes } = useSelector(
    (state) => ({
      ledgerTypes: selectedLedgerTypes(
        state.ledgerTypes.entities,
        ledgerTypesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ledgerTypes weren't selected we should close modal
  useEffect(() => {
    if (!ledgerTypesUIProps.ids || ledgerTypesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledgerTypesUIProps.ids]);

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
            {ledgerTypes.map((ledgerType) => (
              <tr key={`id${ledgerType.id}`}>
                <td>{ledgerType.id}</td>
                <td>
                  <span className="ml-3">
                    {ledgerType.lastName}, {ledgerType.firstName}
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
