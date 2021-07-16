import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/endOfDays/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//endOfDay
//EndOfDay

export function EditDialog({ id, show, onHide }) {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      initEndOfDay: endOfDaysUIContext.initEndOfDay,
    };
  }, [endOfDaysUIContext]);

  // EndOfDays Redux state
  const dispatch = useDispatch();
  const { actionsLoading, endOfDayForEdit ,payModes,endOfDayTypes, endOfDayedLocations, storeList} = useSelector(
    (state) => ({
      actionsLoading: state.endOfDays.actionsLoading,
      endOfDayForEdit: state.endOfDays.endOfDayForEdit,
      payModes:state.endOfDays.payModes,
      endOfDayTypes:state.endOfDays.endOfDayTypes,
      endOfDayedLocations:state.endOfDays.endOfDayedLocations, 
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting EndOfDay by id
    dispatch(actions.fetchEndOfDay(id));
    dispatch(actions.fetchLocations());
    dispatch(actions.fetchEndOfDayTypes());
    dispatch(actions.fetchPayModes());
    dispatch(commonActions.fetchStores());

  }, [id, dispatch]);

  // server request for saving endOfDay
  const saveEndOfDay = (endOfDay) => {
    endOfDay.storeId=parseInt(endOfDay.storeId);
    endOfDay.endOfDayedLocationId=parseInt(endOfDay.endOfDayedLocationId);
    endOfDay.endOfDayType=parseInt(endOfDay.endOfDayType);
    endOfDay.mode=parseInt(endOfDay.mode);

    if (!id) {
      // server request for creating endOfDay
      dispatch(actions.createEndOfDay(endOfDay)).then(() => onHide());
    } else {
      // server request for updating endOfDay
      dispatch(actions.updateEndOfDay(endOfDay)).then(() => onHide());
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
        saveEndOfDay={saveEndOfDay}
        actionsLoading={actionsLoading}
        endOfDay={endOfDayForEdit || endOfDaysUIProps.initEndOfDay}
        onHide={onHide}
        payModes={payModes}
        endOfDayTypes={endOfDayTypes}
        locationList={endOfDayedLocations}
        storeList={storeList}
      />
    </Modal>
  );
}
