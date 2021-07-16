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

//cashReceipt
//CashReceipt

// Validation schema
const CashReceiptEditSchema = Yup.object().shape({
  inwardDate: Yup.date().required("Date is required"),
  amount: Yup.number().integer().moreThan(0).positive().min(1).required("Amount is required"),
  receiptFrom: Yup.string().required("Paid To is required"),
  remarks: Yup.string().required("CashReceipt details is required"),
  storeId: Yup.number().required("Select Store "),
  slipNo:Yup.string().required("CashReceipt Slip No is required"),
});

export function EditForm({
  saveCashReceipt,
  cashReceipt,
  actionsLoading,
  onHide,
  transcationList
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={cashReceipt}
        validationSchema={CashReceiptEditSchema}
        onSubmit={(values) => {
          saveCashReceipt(values);
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

                  
                  
                  {/* Party  */}
                  <div className="col-lg-4">
                    <Select name="transcationModeId" label="Mode">
                      <option value={null} >Select Mode</option>
                      {transcationList.map((item) => (
                        <option key={item.transcationModeId} value={item.transcationModeId}>
                          {item.transcation}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                 
                </div>
               
                <div className="form-group row">
                  {/* Date of CashReceipt */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="inwardDate"
                      label="On Date"
                    />
                  </div>
                  {/*  State Name*/}
                 <div className="col-lg-4">
                    <Field
                      name="slipNo"
                      component={Input}
                      placeholder="CashReceipt SlipNo"
                      label="CashReceipt SlipNo"
                    />
                  </div>
                   {/*  Paid To Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="receiptFrom"
                      component={Input}
                      placeholder="Party"
                      label="Party"
                    />
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
