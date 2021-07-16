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

//dueRecovered
//DueRecovered

// {
//   "dueRecoverdId": 1,
//   "paidDate": "2020-01-14T00:00:00",
//   "duesListId": 7,
//   "duesList": null,
//   "amountPaid": 499,
//   "isPartialPayment": false,
//   "modes": 0,
//   "remarks": "manual bill no 387",
//   "storeId": 1,
//   "store": null,
//   "userId": "AlokKumar"
// }
// Validation schema
const DueRecoveredEditSchema = Yup.object().shape({
  paidDate: Yup.date().required("Date is required"),
  amountPaid: Yup.number()
    .integer()
    .moreThan(0)
    .positive()
    .min(1)
    .required("Amount is required"),
  duesListId: Yup.number()
    .moreThan(0)
    .required("Select Inv is required"),
  modes: Yup.number().required("Payments Mode is required"),
  remarks: Yup.string().required("Remarks/details is required"),
  storeId: Yup.number().required("Select Store "),
});

export function EditForm({
  saveDueRecovered,
  dueRecovered,
  actionsLoading,
  onHide,
  dueList,
  payModes,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={dueRecovered}
        validationSchema={DueRecoveredEditSchema}
        onSubmit={(values) => {
          saveDueRecovered(values);
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

                  {/* Invoice List */}
                  <div className="col-lg-4">
                    <Select   name="duesListId" placeholder="Invoice No" label="Invoice" >
                      <option value="">Select Invoice</option>
                      {dueList &&
                        dueList.map((item) => (
                          <option key={item.duesListId} value={item.duesListId}>
                            {item.dailySale.invNo}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/* Date of Payment */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="paidDate"
                      label="Date"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/*  Amount*/}
                  <div className="col-lg-4">
                    <Field
                      name="amountPaid"
                      component={Input}
                      placeholder="Paid Amount"
                      label="Amount"
                    />
                  </div>
                  {/*  Remarks*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field name="isPartialPayment" type="checkbox" />
                    {} Partial Payment
                  </div>
                </div>
                <div className="form-group row">
                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="modes" label="Mode">
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
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
