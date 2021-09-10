import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rentedLocations/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records

//RentedLocation
//rentedLocation

export function DeletesDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.rentedLocations.actionsLoading }),
    shallowEqual
  );

  // if rentedLocations weren't selected we should close modal
  useEffect(() => {
    if (!rentedLocationsUIProps.ids || rentedLocationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentedLocationsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRentedLocations = () => {
    // server request for deleting rentedLocation by selected ids
    dispatch(actions.deleteRentedLocations(rentedLocationsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchRentedLocations(rentedLocationsUIProps.queryParams)).then(
        () => {
          // clear selections list
          rentedLocationsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          RentedLocations Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected rentedLocations?</span>
        )}
        {isLoading && <span>RentedLocation are deleting...</span>}
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
            onClick={deleteRentedLocations}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
