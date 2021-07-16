import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/connections/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
import * as commonActions from "../../../../_redux/Actions";


//Connection
//connection

export function EditDialog({ id, show, onHide }) {
  // Connections UI Context
  const connectionsUIContext = useUIContext();
  const connectionsUIProps = useMemo(() => {
    return {
      initConnection: connectionsUIContext.initConnection,
    };
  }, [connectionsUIContext]);

  // Connections Redux state
  const dispatch = useDispatch();
  const { actionsLoading, connectionForEdit, rentTypes } = useSelector(
    (state) => ({
      actionsLoading: state.connections.actionsLoading,
      connectionForEdit: state.connections.connectionForEdit,
      rentTypes: state.commonTypes.rentTypes
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Connection by id
    dispatch(actions.fetchConnection(id));
    dispatch(commonActions.fetchEnumValue("rentType"));
  }, [id, dispatch]);

  // server request for saving connection
  const saveConnection = (connection) => {
    connection.connection=parseInt(connection.connection);
    if (!id) {
      // server request for creating connection
      dispatch(actions.createConnection(connection)).then(() => onHide());
    } else {
      // server request for updating connection
      dispatch(actions.updateConnection(connection)).then(() => onHide());
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
        saveConnection={saveConnection}
        actionsLoading={actionsLoading}
        connection={connectionForEdit || connectionsUIProps.initConnection}
        onHide={onHide}
        rentTypes={rentTypes}
      />
    </Modal>
  );
}
