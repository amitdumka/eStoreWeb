// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select,DatePickerField } from "../../../../../../_metronic/_partials/controls";

//Deliveries
//deliveries
//Delivery
//delivery

// Validation schema
const DeliveryEditSchema = Yup.object().shape({
  remarks: Yup.string().required("Remarks is required"),
  talioringBookingId: Yup.number()
    .moreThan(0)
    .required("Tax Type is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  deliveryDate: Yup.date().required("Date is required"),
  invNo: Yup.string().required("Invoice No is required"),
  amount: Yup.number()
    .moreThan(0)
    .required("Amount is required"),
});

export function EditForm({
  saveDelivery,
  delivery,
  actionsLoading,
  onHide,
  stores,
  bookings,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={delivery}
        validationSchema={DeliveryEditSchema}
        onSubmit={(values) => {
          saveDelivery(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* storeId */}
                  <div className="col-lg-4">
                    <Select name="storeId" label="Store">
                      {stores.map((item) => (
                        <option key={item.storeId} value={item.storeId}>
                          {item.storeName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {/* storeId */}
                  <div className="col-lg-4">
                    <Select name="talioringBookingId" label="Booking">
                      <option>Select Booking</option>
                      {bookings.map((item) => (
                        <option
                          key={item.talioringBookingId}
                          value={item.talioringBookingId}
                        >
                          {item.bookingSlipNo}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <DatePickerField
                      name="deliveryDate"
                      format="DD-MM-YYY"
                      placeholder="Date"
                      label="Date"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="invNo"
                      component={Input}
                      placeholder="Invoice No"
                      label="Invoice No"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
