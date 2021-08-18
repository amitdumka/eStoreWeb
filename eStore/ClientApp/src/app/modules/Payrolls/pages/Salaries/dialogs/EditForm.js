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

//salary
//Salary


// Validation schema
const SalaryEditSchema = Yup.object().shape({
  effectiveDate: Yup.date().required("Date is required"),
  employeeId: Yup.number().moreThan(0).required("Employee is required"),
});

export function EditForm({
  saveSalary,
  salary,
  actionsLoading,
  onHide,employeeList,
  salaryUnits,
  storeList
}) {
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={salary}
        validationSchema={SalaryEditSchema}
        onSubmit={(values) => {
          console.log(values);
          saveSalary(values);
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
                      {storeList && storeList.map((item) => (
                        <option key={item.storeId} value={item.storeId}>
                          {item.storeName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Select
                      name="employeeId"
                      placeholder="Employee"
                      label="Employee"
                    >
                      <option value="">Select Employee</option>
                      {employeeList && employeeList.map((item) => (
                        item.isWorking &&
                        <option key={item.employeeId} value={item.employeeId}>
                          {item.staffName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                </div>
                <div className="form-group row">
                  {/* Date of Salary */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="effectiveDate"
                      label="Effective Date"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="closeDate"
                      label="Close Date"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="basicSalary"
                      component={Input}
                      placeholder="Basic Salary"
                      label="Basic Salary"
                    />
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                      name="incentiveRate"
                      component={Input}
                      placeholder="Incentive Rate"
                      label="Incentive Rate"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="incentiveTarget"
                      component={Input}
                      placeholder="Incentive Target"
                      label="Incentive Target"
                    />
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-lg-4">
                    <Field
                      name="wowBillRate"
                      component={Input}
                      placeholder="WOW Bill Rate"
                      label="WOW Bill Rate"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="wowBillTarget"
                      component={Input}
                      placeholder="WOW Bill Target"
                      label="WOW Bill Target"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="lPRate"
                      component={Input}
                      placeholder="LPcs Rate"
                      label="LPcs Rate"
                    />
                  </div>
                  {/* Tailoring Division */}
                  <div className="col-lg-4">
                    <Field name="isSundayBillable" type="checkbox" />
                    {} Tailoring Division<br/>
                    <Field name="isFullMonth" type="checkbox" />
                    {} Full Month Billable<br/>
                    <Field name="IsEffective" type="checkbox" />
                    {} Effective<br/>
                    <Field name="isTailoring" type="checkbox" />
                    {} Sunday Billable
                  </div>
                </div>
                {/* <div className="form-group row">
                <div className="col-lg-4">
                    <Field name="isTailoring" type="checkbox" />
                    {} Sunday Billable
                  </div>
                  <div className="col-lg-4">
                    <Field name="isFullMonth" type="checkbox" />
                    {} Full Month Billable
                  </div>
                  <div className="col-lg-4">
                    <Field name="IsEffective" type="checkbox" />
                    {} Effective
                  </div>
                </div> */}
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
