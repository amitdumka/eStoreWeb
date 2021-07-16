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


//billPayment
//BillPayment

// Validation schema
const BillPaymentEditSchema = Yup.object().shape({
  paymentDate: Yup.date().required("Date is required"),
  eletricityBillId: Yup.number()
    .moreThan(0)
    .required("Period is required"),
  amount: Yup.number()
    .moreThan(0)
    .required("Select BillPayment Type , is required"),
  mode: Yup.number().required("Select BillPayment Location , is required"),
  remarks: Yup.string().required("Remarks is required"),
  paymentDetails: Yup.string().required("Payment Details is required"),
});

export function EditForm({
  saveBillPayment,
  billPayment,
  actionsLoading,
  onHide,
  billList,
  payModes,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={billPayment}
        validationSchema={BillPaymentEditSchema}
        onSubmit={(values) => {
          saveBillPayment(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transpabillPayment">
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

                  {/* Email */}
                  <div className="col-lg-4">
                    <Select
                      name="eletricityBillId"
                      placeholder="Bill No"
                      label="Bill No"
                    >
                      <option value="">Select Bill</option>
                      {billList &&
                        billList.map((item) => (
                          <option
                            key={item.eletricityBillId}
                            value={item.eletricityBillId}
                          >
                            {item.billNumber}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/* Date of BankDeposit */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="paymentDate"
                      label="On Date"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Select name="mode" placeholder="Mode" label="Mode">
                      <option value="">Select Mode</option>
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="paymentDetails"
                      component={Input}
                      placeholder="Payment Details"
                      label="Payment Details"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                  <div className="col-lg-4 text-info"><Field className="mr-2 ml-2" name="isPartialPayment" type="checkbox" />{ "  "} Partial Payment </div>
                  <div className="col-lg-4 text-danger"><Field className="mr-2 ml-2 " name="isBillCleared" type="checkbox" />{"  "} Full Payment </div>
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
