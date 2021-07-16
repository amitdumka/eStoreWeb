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

//staffAdvanceReceipt
//StaffAdvanceReceipt

// Validation schema
const StaffAdvanceReceiptEditSchema = Yup.object().shape({
  receiptDate: Yup.date().required("Date is required"),
  amount: Yup.number()
    .integer()
    .moreThan(0)
    .positive()
    .min(1)
    .required("Amount is required"),
  employeeId: Yup.number().required("Employee is required"),
  payMode: Yup.number().required("Payment Mode is required"),
  details: Yup.string().required("Details is required"),
});

export function EditForm({
  saveStaffAdvanceReceipt,
  staffAdvanceReceipt,
  actionsLoading,
  onHide,
  employeeList,
  payModes,
  partyList,
  storeList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={staffAdvanceReceipt}
        validationSchema={StaffAdvanceReceiptEditSchema}
        onSubmit={(values) => {
          saveStaffAdvanceReceipt(values);
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
                      {storeList &&
                        storeList.map((item) => (
                          <option key={item.storeId} value={item.storeId}>
                            {item.storeName}
                          </option>
                        ))}
                    </Select>
                  </div>

                  {/* Email */}
                  <div className="col-lg-4">
                    <Select  name="employeeId"   label="Employee">
                      <option value="">Select Employee</option>
                      {employeeList &&
                        employeeList.map((item) => (
                          <option key={item.employeeId} value={item.employeeId}>
                            {item.staffName}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/* Date of StaffAdvanceReceipt */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="receiptDate"
                      label="On Date"
                    />
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Select name="partyId" placeholder="Ledger" label="Ledger">
                      <option value="">Select Ledger/Party</option>
                      {partyList &&
                        partyList.map((item) => (
                          <option key={item.partyId} value={item.partyId}>
                            {item.partyName}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>

                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="payMode" label="Receipt Mode">
                      {payModes &&
                        payModes.map((item) => (
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
                      name="details"
                      component={Input}
                      placeholder="Details"
                      label="Details"
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
