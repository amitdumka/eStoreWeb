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

//duesList
//DuesList
// {
//   "duesListId": 1,
//   "amount": 6824,
//   "isRecovered": true,
//   "recoveryDate": "2020-08-06T00:00:00",
//   "dailySaleId": 550,
//   "dailySale": null,
//   "isPartialRecovery": false,
//   "storeId": 1,
//   "store": null,
//   "userId": "Admin"
// }
// Validation schema
const DuesListEditSchema = Yup.object().shape({
  amount: Yup.number()
    .integer()
    .moreThan(0)
    .positive()
    .min(1)
    .required("Amount is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Select Store "),
  dailySaleId: Yup.number()
    .moreThan(0)
    .required("Select InvoiceNo "),
});

export function EditForm({
  saveDuesList,
  duesList,
  actionsLoading,
  onHide,
  saleList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={duesList}
        validationSchema={DuesListEditSchema}
        onSubmit={(values) => {
          saveDuesList(values);
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

                  {/* Paid By */}
                  <div className="col-lg-4">
                    <Select
                      name="dailySaleId"
                      placeholder="Invoice"
                      label="Invoice"
                    >
                      <option value="">Select Invoice</option>
                      
                      { saleList &&(
                      saleList.map((item) => (
                        <option key={item.dailySaleId} value={item.dailySaleId}>
                          {item.invNo}
                        </option>
                      )))
                      }
                    </Select>
                  </div>
                  {/* Date of DuesList */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="saleList.saleDate"
                      label="On Date"
                      disabled
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
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
