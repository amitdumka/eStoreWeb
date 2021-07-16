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

//bill
//Bill

// Validation schema
const BillEditSchema = Yup.object().shape({
  electricityConnectionId: Yup.number()
    .moreThan(0)
    .required("Select Connection"),
  billNumber: Yup.string().required("Bill Number is required"),
  billDate: Yup.date().required("Bill Date is required"),
  meterReadingDate: Yup.date().required("Date is required"),
  currentMeterReading: Yup.number()
    .moreThan(0)
    .required("Meter Reading is required"),
  totalUnit: Yup.number()
    .moreThan(0)
    .required("Meter Reading is required"),
  currentAmount: Yup.number()
    .moreThan(0)
    .required("Current Amount is required"),
  arrearAmount: Yup.number()
    .moreThan(0)
    .required("Arrear Amount is required"),
  netDemand: Yup.number()
    .moreThan(0)
    .required("Net Demand is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
});

export function EditForm({
  saveBill,
  bill,
  actionsLoading,
  onHide,
  connectionList,
  
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bill}
        validationSchema={BillEditSchema}
        onSubmit={(values) => {
          saveBill(values);
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

                  {/* Email */}
                  <div className="col-lg-4">
                    <Select
                      name="electricityConnectionId"
                      placeholder="Connection"
                      label="Connection"
                    >
                      <option value="">Select Connection</option>
                      {connectionList && connectionList.map((item) => (
                        <option
                          key={item.electricityConnectionId}
                          value={item.electricityConnectionId}
                        >
                          {item.consumerNumber}
                        </option>
                      ))}
                    </Select>
                  </div>
                   {/*  Father Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="billNumber"
                      component={Input}
                      placeholder="Bill Number"
                      label="Bill Number"
                    />
                  </div>
                 
                </div>

                <div className="form-group row">
                  {/* Date of BankDeposit */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="billDate"
                      label="Bill Date"
                    />
                  </div>

                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="meterReadingDate"
                      label="Reading Date"
                    />
                  </div>
                   {/*  State Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="currentMeterReading"
                      component={Input}
                      placeholder="Meter Reading"
                      label="Meter Reading"
                    />
                  </div>
                 
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="totalUnit"
                      component={Input}
                      placeholder="Total Unit"
                      label="Total Unit"
                    />
                  </div>
                </div>
                <div className="form-group row">
                
                  
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="currentAmount"
                      component={Input}
                      placeholder="Current Amount"
                      label="Current Amount"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="arrearAmount"
                      component={Input}
                      placeholder="Arrear Amount"
                      label="Arrear Amount"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="netDemand"
                      component={Input}
                      placeholder="Net Demand"
                      label="Net Demand"
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
