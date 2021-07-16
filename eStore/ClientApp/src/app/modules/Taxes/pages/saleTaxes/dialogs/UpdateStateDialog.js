import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/saleTaxes/Actions";
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

export function UpdateStateDialog({ show, onHide }) {
  // SaleTaxes UI Context
  const saleTaxesUIContext = useUIContext();
  const saleTaxesUIProps = useMemo(() => {
    return {
      ids: saleTaxesUIContext.ids,
      setIds: saleTaxesUIContext.setIds,
      queryParams: saleTaxesUIContext.queryParams,
    };
  }, [saleTaxesUIContext]);

  // SaleTaxes Redux state
  const { saleTaxes, isLoading } = useSelector(
    (state) => ({
      saleTaxes: selectedSaleTaxes(
        state.saleTaxes.entities,
        saleTaxesUIProps.ids
      ),
      isLoading: state.saleTaxes.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!saleTaxesUIProps.ids || saleTaxesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saleTaxesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update saleTaxes status by selected ids
    dispatch(actions.updateSaleTaxesStatus(saleTaxesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchSaleTaxes(saleTaxesUIProps.queryParams)).then(
          () => {
            // clear selections list
            saleTaxesUIProps.setIds([]);
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
          Status has been updated for selected saleTaxes
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
