import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   PurchaseTaxestatusCssClasses,
//   PurchaseTaxestatusTitles,
// } from "../UIHelpers";
import { useUIContext } from "../UIContext";

//purchaseTax
//PurchaseTax


const selectedPurchaseTaxes = (entities, ids) => {
  const _purchaseTaxes = [];
  ids.forEach((id) => {
    const purchaseTax = entities.find((el) => el.id === id);
    if (purchaseTax) {
      _purchaseTaxes.push(purchaseTax);
    }
  });
  return _purchaseTaxes;
};

export function FetchDialog({ show, onHide }) {
  // PurchaseTaxes UI Context
  const purchaseTaxesUIContext = useUIContext();
  const purchaseTaxesUIProps = useMemo(() => {
    return {
      ids: purchaseTaxesUIContext.ids,
    };
  }, [purchaseTaxesUIContext]);

  // PurchaseTaxes Redux state
  const { purchaseTaxes } = useSelector(
    (state) => ({
      purchaseTaxes: selectedPurchaseTaxes(
        state.purchaseTaxes.entities,
        purchaseTaxesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if purchaseTaxes weren't selected we should close modal
  useEffect(() => {
    if (!purchaseTaxesUIProps.ids || purchaseTaxesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseTaxesUIProps.ids]);

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
            {purchaseTaxes.map((purchaseTax) => (
              <tr key={`id${purchaseTax.id}`}>
                <td>{purchaseTax.id}</td>
                <td>
                  <span className="ml-3">
                    {purchaseTax.lastName}, {purchaseTax.firstName}
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
