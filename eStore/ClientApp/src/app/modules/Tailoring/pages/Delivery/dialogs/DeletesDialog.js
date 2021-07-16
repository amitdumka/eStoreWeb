import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Delivery/Actions";
import { useUIContext } from "../UIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

// Delete Selected Records
//Deliveries
//deliveries
//Delivery
//delivery


export function DeletesDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.deliveries.actionsLoading }),
    shallowEqual
  );

  // if deliveries weren't selected we should close modal
  useEffect(() => {
    if (!deliveriesUIProps.ids || deliveriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveriesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDeliveries = () => {
    // server request for deleting delivery by selected ids
    dispatch(actions.deleteDeliveries(deliveriesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDeliveries(deliveriesUIProps.queryParams)).then(
        () => {
          // clear selections list
          deliveriesUIProps.setIds([]);
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
          Deliveries Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected deliveries?</span>
        )}
        {isLoading && <span>Delivery are deleting...</span>}
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
            onClick={deleteDeliveries}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
