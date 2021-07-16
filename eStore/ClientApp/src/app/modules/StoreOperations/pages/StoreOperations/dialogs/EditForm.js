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
import { Checkbox } from "@material-ui/core";
//attendance
//Attendance

// Validation schema
const AttendanceEditSchema = Yup.object().shape({
  attDate: Yup.date().required("Date is required"),
  status: Yup.number().required("Status is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  entryTime: Yup.string().required("Entry time is required"),
  employeeId: Yup.number()
    .moreThan(0)
    .required("Employee is required"),
});
const HolidayEditSchema = Yup.object().shape({
  onDate: Yup.date().required("Date is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  remarks: Yup.string().required("Remarks is required"),
  approvedBy: Yup.string().required("Approved By is required"),
});
const StoreClosedEditSchema = Yup.object().shape({
  onDate: Yup.date().required("Date is required"),
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  remarks: Yup.string().required("Remarks is required"),
  approvedBy: Yup.string().required("Approved By is required"),
});
const StoreOperationEditSchema = Yup.object().shape({
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  remarks: Yup.string().required("Remarks is required"),
});
const StoreCloseEditSchema = Yup.object().shape({
  storeId: Yup.number()
    .moreThan(0)
    .required("Store is required"),
  remarks: Yup.string().required("Remarks is required"),
});

export function EditForm({
  saveAttendance,
  attendance,
  actionsLoading,
  onHide,
  employeeList,
  attendanceUnits,
  storeList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={attendance}
        validationSchema={AttendanceEditSchema}
        onSubmit={(values) => {
          saveAttendance(values);
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
                    <Select
                      name="employeeId"
                      placeholder="Employee"
                      label="Employee"
                    >
                      <option value="">Select Employee</option>
                      {employeeList &&
                        employeeList.map((item) => (
                          <option key={item.employeeId} value={item.employeeId}>
                            {item.staffName}
                          </option>
                        ))}
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select name="status" placeholder="Status" label="Status">
                      {attendanceUnits &&
                        attendanceUnits.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/* Date of Attendance */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="attDate"
                      label="On Date"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="entryTime"
                      component={Input}
                      placeholder="Entry Time"
                      label="Entry Time"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                  {/* Tailoring Division */}
                  <div className="col-lg-4">
                    <Field name="isTailoring" type="checkbox" />
                    {} Tailoring Division
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

export function EditOpenForm({
  saveStoreOpen,
  storeOpen,
  actionsLoading,
  onHide,
  storeList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={storeOpen}
        validationSchema={StoreOperationEditSchema}
        onSubmit={(values) => {
          saveStoreOpen(values);
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
                  {/*  Remarks*/}
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
export function EditCloseForm({
  saveStoreClose,
  storeClose,
  actionsLoading,
  onHide,
  storeList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={storeClose}
        validationSchema={StoreCloseEditSchema}
        onSubmit={(values) => {
          saveStoreClose(values);
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
                  {/*  Remarks*/}
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
export function EditHolidayForm({
  saveHoliday,
  holiday,
  actionsLoading,
  onHide,
  storeList,
  holidayReasons,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={holiday}
        validationSchema={HolidayEditSchema}
        onSubmit={(values) => {
          saveHoliday(values);
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
                  {/* Date of on Date */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="Date"
                    />
                  </div>
                  {/*  Reason*/}
                  <div className="col-lg-4">
                    <Select name="reasons" label="Reasons">
                      {holidayReasons &&
                        holidayReasons.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/*  Remarks*/}
                  <div className="col-lg-4">
                    <Field
                      name="approvedBy"
                      component={Input}
                      placeholder="Approved By"
                      label="Approved By"
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

export function EditStoreClosedForm({
  saveData,
  initData,
  actionsLoading,
  onHide,
  storeList,
  holidayReasons,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initData}
        validationSchema={StoreClosedEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transpapettyCashBook">
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
                  {/* Date of onDate */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="Closing Date"
                    />
                  </div>
                  {/*  Reason*/}
                  <div className="col-lg-4">
                    <Select name="reasons" label="Reasons">
                      {holidayReasons &&
                        holidayReasons.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
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
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="approvedBy"
                      component={Input}
                      placeholder="Approved By"
                      label="Approved By"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  {/* Date of onDate */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="endDate"
                      label="End Date"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field name="nDays" type="checkbox" /> {"  "} Multiple Days
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
