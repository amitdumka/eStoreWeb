// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

//Connection
//connection

// Validation schema
const ConnectionEditSchema = Yup.object().shape({
  locationName: Yup.string().required("Location Name is required"),
  connectioName: Yup.string().required("Connection Name is required"),
  connectinDate: Yup.date().required("Date is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State, is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Select Store Location , is required"),
  pinCode: Yup.string().required("PinCode is required"),
  consumerNumber: Yup.string().required("Consumer Name is required"),
  conusumerId: Yup.string().required("Consumer Id is required"),
  connection: Yup.number().required("Select Connection Type"),
  kvLoad: Yup.string().required("KV Load is required"),
  totalConnectionCharges: Yup.number().required(
    "Connection Charger is required"
  ),
  securityDeposit: Yup.string().required("Security Deposit is required"),
  remarks: Yup.string().required("Remarks is required"),
});

export function EditForm({
  saveConnection,
  connection,
  rentTypes,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={connection}
        validationSchema={ConnectionEditSchema}
        onSubmit={(values) => {
          saveConnection(values);
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
                  {/* Store */}
                  <div className="col-lg-4">
                    <Select name="storeId" label="Store">
                      <option value="1">Dumka</option>
                      <option value="2">Jamshedpur</option>
                    </Select>
                  </div>
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="locationName"
                      component={Input}
                      placeholder="Location Name"
                      label="Location Name"
                    />
                  </div>
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="connectioName"
                      component={Input}
                      placeholder="Connection Name"
                      label="ConnectionName"
                    />
                  </div>
                  {/* Staff Name */}
                </div>
                <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                      name="city"
                      component={Input}
                      placeholder="City"
                      label="City"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="state"
                      component={Input}
                      placeholder="State"
                      label="State"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="pinCode"
                      component={Input}
                      placeholder="Zip Code"
                      label="Pin Code"
                    />
                  </div>
                </div>
               
                <div className="form-group row">
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="consumerNumber"
                      component={Input}
                      placeholder="Consumer Number"
                      label="Consumer Number"
                    />
                  </div>
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="conusumerId"
                      component={Input}
                      placeholder="Conusumer Id"
                      label="Conusumer Id"
                    />
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Select
                      name="connection"
                      placeholder="Connection Type"
                      label="Connection Type"
                    >
                      <option value="">Select Type</option>
                      {rentTypes && rentTypes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
               
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="totalConnectionCharges"
                      component={Input}
                      placeholder="Amount"
                      label="Connection Chargers"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="securityDeposit"
                      component={Input}
                      placeholder="security Deposit"
                      label="securityDeposit"
                    />
                  </div>
                  {/* isWorking */}
                  <div className="col-lg-4">
                    <Field name="ownedMetter" type="checkbox" /> Owned Meter
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="connectinDate"
                      label="Connection Date"
                    />
                  </div>
                  {/* Date of BankDeposit */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="disconnectionDate"
                      label="Dis-Connection Date"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="kvLoad"
                      component={Input}
                      placeholder="KV Load"
                      label="KV Load"
                    />
                  </div>
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
