import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dueRecovereds/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";

//dueRecovered
//DueRecovered

export function EditDialog({ id, show, onHide }) {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      initDueRecovered: dueRecoveredsUIContext.initDueRecovered,
    };
  }, [dueRecoveredsUIContext]);

  // DueRecovereds Redux state
  const dispatch = useDispatch();
  const {
    actionsLoading,
    dueRecoveredForEdit,
    dueList, payModes,
  } = useSelector(
    (state) => ({
      actionsLoading: state.dueRecovereds.actionsLoading,
      dueRecoveredForEdit: state.dueRecovereds.dueRecoveredForEdit,
      employeeList: state.dueRecovereds.employeeEntities,
      partiesList: state.dueRecovereds.partiesEntities,
      bankAccountsList: state.dueRecovereds.bankaccEntities,
      payModes: state.commonTypes.payModes, 
      dueList: state.dueRecovereds.dueList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting DueRecovered by id
    dispatch(actions.fetchDueRecovered(id));
     dispatch(commonActions.fetchEnumValue("payMode"));
     dispatch(actions.fetchDueList());
    //dispatch(actions.fetchEmployees());
  }, [id, dispatch]);

  // server request for saving dueRecovered
  const saveDueRecovered = (dueRecovered) => {
    dueRecovered.payMode = parseInt(dueRecovered.payMode);
    if (!id) {
      // server request for creating dueRecovered
      dispatch(actions.createDueRecovered(dueRecovered)).then(() => onHide());
    } else {
      // server request for updating dueRecovered
      dispatch(actions.updateDueRecovered(dueRecovered)).then(() => onHide());
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
        saveDueRecovered={saveDueRecovered}
        actionsLoading={actionsLoading}
        dueRecovered={
          dueRecoveredForEdit || dueRecoveredsUIProps.initDueRecovered
        }
        onHide={onHide}
        dueList={dueList}
        payModes={payModes}
      />
    </Modal>
  );
}
