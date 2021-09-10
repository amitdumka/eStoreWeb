import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rentedLocations/Actions";
import { useUIContext } from "../UIContext";


//RentedLocation
//rentedLocation

const selectedRentedLocations = (entities, ids) => {
  const _rentedLocations = [];
  ids.forEach((id) => {
    const rentedLocation = entities.find((el) => el.id === id);
    if (rentedLocation) {
      _rentedLocations.push(rentedLocation);
    }
  });
  return _rentedLocations;
};

export function UpdateStateDialog({ show, onHide }) {
  // RentedLocations UI Context
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      ids: rentedLocationsUIContext.ids,
      setIds: rentedLocationsUIContext.setIds,
      queryParams: rentedLocationsUIContext.queryParams,
    };
  }, [rentedLocationsUIContext]);

  // RentedLocations Redux state
  const { rentedLocations, isLoading } = useSelector(
    (state) => ({
      rentedLocations: selectedRentedLocations(
        state.rentedLocations.entities,
        rentedLocationsUIProps.ids
      ),
      isLoading: state.rentedLocations.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!rentedLocationsUIProps.ids || rentedLocationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentedLocationsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update rentedLocations status by selected ids
    dispatch(actions.updateRentedLocationsStatus(rentedLocationsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchRentedLocations(rentedLocationsUIProps.queryParams)).then(
          () => {
            // clear selections list
            rentedLocationsUIProps.setIds([]);
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
          Status has been updated for selected rentedLocations
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
            {rentedLocations.map((rentedLocation) => (
              <tr key={`id${rentedLocation.id}`}>
                <td>{rentedLocation.id}</td>
                
                <td>
                  <span className="ml-3">
                    {rentedLocation.lastName}, {rentedLocation.firstName}
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
