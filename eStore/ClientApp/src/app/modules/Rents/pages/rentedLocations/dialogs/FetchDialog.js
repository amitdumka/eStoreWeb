import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   RentedLocationStatusCssClasses,
//   RentedLocationStatusTitles,
// } from "../UIHelpers";
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

export function FetchDialog({ show, onHide }) {
  // RentedLocations UI Context
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      ids: rentedLocationsUIContext.ids,
    };
  }, [rentedLocationsUIContext]);

  // RentedLocations Redux state
  const { rentedLocations } = useSelector(
    (state) => ({
      rentedLocations: selectedRentedLocations(
        state.rentedLocations.entities,
        rentedLocationsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if rentedLocations weren't selected we should close modal
  useEffect(() => {
    if (!rentedLocationsUIProps.ids || rentedLocationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentedLocationsUIProps.ids]);

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
