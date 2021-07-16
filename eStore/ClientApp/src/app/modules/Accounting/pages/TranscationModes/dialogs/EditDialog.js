import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/TranscationModes/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";

//transcationMode
//TranscationMode

export function EditDialog({ id, show, onHide }) {
  // TranscationModes UI Context
  const transcationModesUIContext = useUIContext();
  const transcationModesUIProps = useMemo(() => {
    return {
      initTranscationMode: transcationModesUIContext.initTranscationMode,
    };
  }, [transcationModesUIContext]);

  // TranscationModes Redux state
  const dispatch = useDispatch();
  const { actionsLoading, transcationModeForEdit} = useSelector(
    (state) => ({
      actionsLoading: state.transcationModes.actionsLoading,
      transcationModeForEdit: state.transcationModes.transcationModeForEdit,
      
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting TranscationMode by id
    dispatch(actions.fetchTranscationMode(id));    
  }, [id, dispatch]);

  // server request for saving transcationMode
  const saveTranscationMode = (transcationMode) => {
    transcationMode.payMode=parseInt(transcationMode.payMode);
    if (!id) {
      // server request for creating transcationMode
      dispatch(actions.createTranscationMode(transcationMode)).then(() => onHide());
    } else {
      // server request for updating transcationMode
      dispatch(actions.updateTranscationMode(transcationMode)).then(() => onHide());
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
        saveTranscationMode={saveTranscationMode}
        actionsLoading={actionsLoading}
        transcationMode={transcationModeForEdit || transcationModesUIProps.initTranscationMode}
        onHide={onHide} 
      />
    </Modal>
  );
}
