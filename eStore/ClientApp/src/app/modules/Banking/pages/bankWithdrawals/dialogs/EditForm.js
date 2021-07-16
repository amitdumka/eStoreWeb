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

//bankWithdrawal
//BankWithdrawal

// Validation schema
const BankWithdrawalEditSchema = Yup.object().shape({
  onDate: Yup.date().required("Date is required"),
  signedBy: Yup.string().required("signedBy is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  inNameOf: Yup.string().required("Name is required"),
  approvedBy: Yup.string().required("Approved By is required"),
  bankAccountId: Yup.number()
    .moreThan(0)
    .required("Select Account"),
  details: Yup.string().required("Details is required"),
  remarks: Yup.string().required("Remarks is required"),
  amount: Yup.number()
    .moreThan(0)
    .required("Amount is required"),
});

export function EditForm({
  saveBankWithdrawal,
  bankWithdrawal,
  actionsLoading,
  onHide,
  bankList,
  payModes,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bankWithdrawal}
        validationSchema={BankWithdrawalEditSchema}
        onSubmit={(values) => {
          saveBankWithdrawal(values);
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
                  {/* Bank */}
                  <div className="col-lg-4">
                    <Select name="storeId" placeholder="Store" label="Store">
                      <option value="1">Dumka</option>
                      <option value="2">Jamshedpur</option>
                    </Select>
                  </div>
                  {/* Bank */}
                  <div className="col-lg-4">
                    <Select
                      name="bankAccountId"
                      placeholder="Account"
                      label="Account"
                    >
                      <option value="-1">Select Bank</option>
                      {bankList ? (
                        bankList.map((item) => (
                          <option
                            key={item.bankAccountId}
                            value={item.bankAccountId}
                          >
                            {item.account}
                          </option>
                        ))
                      ) : (
                        <option value="">Reload Page</option>
                      )}
                    </Select>
                  </div>
                  {/* Date of BankWithdrawal */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="On Date"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="inNameOf"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="details"
                      component={Input}
                      placeholder="Details"
                      label="Details"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="payMode" placeholder="Mode" label="Mode">
                      <option value="">Select Mode</option>
                      {payModes.map((item) => (
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
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>

                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="signedBy"
                      component={Input}
                      placeholder="Signed By"
                      label="Signed By"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="approvedBy"
                      component={Input}
                      placeholder="Approved By"
                      label="Approved By"
                    />
                  </div>
                  {/*  State Name*/}
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
