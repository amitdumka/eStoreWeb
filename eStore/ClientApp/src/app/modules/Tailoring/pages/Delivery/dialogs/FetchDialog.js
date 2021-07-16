import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//Deliveries
//deliveries
//Delivery
//delivery



const selectedDeliveries = (entities, ids) => {
  const _deliveries = [];
  ids.forEach((id) => {
    const delivery = entities.find((el) => el.id === id);
    if (delivery) {
      _deliveries.push(delivery);
    }
  });
  return _deliveries;
};

export function FetchDialog({ show, onHide }) {
  // Deliveries UI Context
  const deliveriesUIContext = useUIContext();
  const deliveriesUIProps = useMemo(() => {
    return {
      ids: deliveriesUIContext.ids,
    };
  }, [deliveriesUIContext]);

  // Deliveries Redux state
  const { deliveries } = useSelector(
    (state) => ({
      deliveries: selectedDeliveries(
        state.deliveries.entities,
        deliveriesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if deliveries weren't selected we should close modal
  useEffect(() => {
    if (!deliveriesUIProps.ids || deliveriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveriesUIProps.ids]);

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
            {deliveries.map((delivery) => (
              <tr key={`id${delivery.id}`}>
                <td>{delivery.id}</td>
                <td>
                  <span className="ml-3">
                    {delivery.lastName}, {delivery.firstName}
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
