import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Delivery/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//Deliveries
//deliveries
//Delivery
//delivery

export function EditDialog({ id, show, onHide }) {
  // Deliveries UI Context
  const deliveriesUIContext = useUIContext();
  const deliveriesUIProps = useMemo(() => {
    return {
      initDelivery: deliveriesUIContext.initDelivery,
    };
  }, [deliveriesUIContext]);

  // Deliveries Redux state
  const dispatch = useDispatch();
  const { actionsLoading, deliveryForEdit, storeList, bookings } = useSelector(
    (state) => ({
      actionsLoading: state.deliveries.actionsLoading,
      deliveryForEdit: state.deliveries.deliveryForEdit,
      taxTypes: state.deliveries.taxTypes,
      bookings: state.deliveries.bookings,
      storeList: state.commonTypes.storeList,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Delivery by id
    dispatch(commonActions.fetchStores());
    dispatch(actions.fetchBookings());
    dispatch(actions.fetchDelivery(id));
  }, [id, dispatch]);

  // server request for saving delivery
  const saveDelivery = (delivery) => {
    delivery.accountType = parseInt(delivery.accountType);

    if (!id) {
      // server request for creating delivery
      dispatch(actions.createDelivery(delivery)).then(() => onHide());
    } else {
      // server request for updating delivery
      dispatch(actions.updateDelivery(delivery)).then(() => onHide());
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
        saveDelivery={saveDelivery}
        actionsLoading={actionsLoading}
        delivery={deliveryForEdit || deliveriesUIProps.initDelivery}
        onHide={onHide}
        bookings={bookings}
        stores={storeList}
      />
    </Modal>
  );
}
