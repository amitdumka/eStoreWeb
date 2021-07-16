import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dayClosings/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//dayClosing
//DayClosing

export function EditDialog({ id, show, onHide }) {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      initDayClosing: dayClosingsUIContext.initDayClosing,
    };
  }, [dayClosingsUIContext]);

  // DayClosings Redux state
  const dispatch = useDispatch();
  const { actionsLoading, dayClosingForEdit ,payModes,dayClosingTypes, dayClosingedLocations, storeList} = useSelector(
    (state) => ({
      actionsLoading: state.dayClosings.actionsLoading,
      dayClosingForEdit: state.dayClosings.dayClosingForEdit,
      payModes:state.dayClosings.payModes,
      dayClosingTypes:state.dayClosings.dayClosingTypes,
      dayClosingedLocations:state.dayClosings.dayClosingedLocations, 
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting DayClosing by id
    dispatch(actions.fetchDayClosing(id));
    dispatch(actions.fetchLocations());
    dispatch(actions.fetchDayClosingTypes());
    dispatch(actions.fetchPayModes());
    dispatch(commonActions.fetchStores());

  }, [id, dispatch]);

  // server request for saving dayClosing
  const saveDayClosing = (dayClosing) => {
    dayClosing.storeId=parseInt(dayClosing.storeId);
    dayClosing.dayClosingedLocationId=parseInt(dayClosing.dayClosingedLocationId);
    dayClosing.dayClosingType=parseInt(dayClosing.dayClosingType);
    dayClosing.mode=parseInt(dayClosing.mode);

    if (!id) {
      // server request for creating dayClosing
      dispatch(actions.createDayClosing(dayClosing)).then(() => onHide());
    } else {
      // server request for updating dayClosing
      dispatch(actions.updateDayClosing(dayClosing)).then(() => onHide());
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
        saveDayClosing={saveDayClosing}
        actionsLoading={actionsLoading}
        dayClosing={dayClosingForEdit || dayClosingsUIProps.initDayClosing}
        onHide={onHide}
        payModes={payModes}
        dayClosingTypes={dayClosingTypes}
        locationList={dayClosingedLocations}
        storeList={storeList}
      />
    </Modal>
  );
}
