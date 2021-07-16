import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Delivery/Actions";
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

export function UpdateStateDialog({ show, onHide }) {
  // Deliveries UI Context
  const deliveriesUIContext = useUIContext();
  const deliveriesUIProps = useMemo(() => {
    return {
      ids: deliveriesUIContext.ids,
      setIds: deliveriesUIContext.setIds,
      queryParams: deliveriesUIContext.queryParams,
    };
  }, [deliveriesUIContext]);

  // Deliveries Redux state
  const { deliveries, isLoading } = useSelector(
    (state) => ({
      deliveries: selectedDeliveries(
        state.deliveries.entities,
        deliveriesUIProps.ids
      ),
      isLoading: state.deliveries.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!deliveriesUIProps.ids || deliveriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update deliveries status by selected ids
    dispatch(actions.updateDeliveriesStatus(deliveriesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDeliveries(deliveriesUIProps.queryParams)).then(
          () => {
            // clear selections list
            deliveriesUIProps.setIds([]);
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
          Status has been updated for selected deliveries
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
