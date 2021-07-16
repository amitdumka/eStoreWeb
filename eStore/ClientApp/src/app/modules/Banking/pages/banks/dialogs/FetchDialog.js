import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
// import {
//   BankStatusCssClasses,
//   BankStatusTitles,
// } from "../UIHelpers";
import { useUIContext } from "../UIContext";


//Bank
//bank


const selectedBanks = (entities, ids) => {
  const _banks = [];
  ids.forEach((id) => {
    const bank = entities.find((el) => el.id === id);
    if (bank) {
      _banks.push(bank);
    }
  });
  return _banks;
};

export function FetchDialog({ show, onHide }) {
  // Banks UI Context
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
    };
  }, [banksUIContext]);

  // Banks Redux state
  const { banks } = useSelector(
    (state) => ({
      banks: selectedBanks(
        state.banks.entities,
        banksUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if banks weren't selected we should close modal
  useEffect(() => {
    if (!banksUIProps.ids || banksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banksUIProps.ids]);

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
            {banks.map((bank) => (
              <tr key={`id${bank.id}`}>
                <td>{bank.id}</td>
                <td>
                  <span className="ml-3">
                    {bank.lastName}, {bank.firstName}
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
