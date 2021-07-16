import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/parties/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//Parties
//parties
//Party
//party

export function EditDialog({ id, show, onHide }) {
  // Parties UI Context
  const partiesUIContext = useUIContext();
  const partiesUIProps = useMemo(() => {
    return {
      initParty: partiesUIContext.initParty,
    };
  }, [partiesUIContext]);

  // Parties Redux state
  const dispatch = useDispatch();
  const { actionsLoading, partyForEdit ,ledgerTypes} = useSelector(
    (state) => ({
      actionsLoading: state.parties.actionsLoading,
      partyForEdit: state.parties.partyForEdit,
      ledgerTypes:state.parties.ledgerTypes
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Party by id
    dispatch(actions.fetchParty(id));
    dispatch(actions.fetchledgerTypes());
  }, [id, dispatch]);

  // server request for saving party
  const saveParty = (party) => {
    
    party.accountType=parseInt(party.accountType);

    if (!id) {
      // server request for creating party
      dispatch(actions.createParty(party)).then(() => onHide());
    } else {
      // server request for updating party
      dispatch(actions.updateParty(party)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EditDialogHeader id={id} />
      <EditForm
        saveParty={saveParty}
        actionsLoading={actionsLoading}
        party={partyForEdit || partiesUIProps.initParty}
        onHide={onHide}
        ledgerTypes={ledgerTypes}
      />
    </Modal>
  );
}
