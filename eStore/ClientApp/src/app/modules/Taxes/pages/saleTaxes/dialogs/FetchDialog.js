import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//SaleTaxes
//saleTaxes
//SaleTax
//saleTax



const selectedSaleTaxes = (entities, ids) => {
  const _saleTaxes = [];
  ids.forEach((id) => {
    const saleTax = entities.find((el) => el.id === id);
    if (saleTax) {
      _saleTaxes.push(saleTax);
    }
  });
  return _saleTaxes;
};

export function FetchDialog({ show, onHide }) {
  // SaleTaxes UI Context
  const saleTaxesUIContext = useUIContext();
  const saleTaxesUIProps = useMemo(() => {
    return {
      ids: saleTaxesUIContext.ids,
    };
  }, [saleTaxesUIContext]);

  // SaleTaxes Redux state
  const { saleTaxes } = useSelector(
    (state) => ({
      saleTaxes: selectedSaleTaxes(
        state.saleTaxes.entities,
        saleTaxesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if saleTaxes weren't selected we should close modal
  useEffect(() => {
    if (!saleTaxesUIProps.ids || saleTaxesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleTaxesUIProps.ids]);

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
            {saleTaxes.map((saleTax) => (
              <tr key={`id${saleTax.id}`}>
                <td>{saleTax.id}</td>
                <td>
                  <span className="ml-3">
                    {saleTax.lastName}, {saleTax.firstName}
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
