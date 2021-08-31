import React from "react";
import ReactSelect from "react-select";
import { Controller } from "react-hook-form";
import { Input, TextField, Checkbox } from "@material-ui/core";
import ReactDatePicker from "react-datepicker";
//import NumberFormat from "react-number-format";

export const CTextField = ({
  label,
  name,
  control,
  className,
  dValue,
  required,
  errors,
}) => (
  <>
    <div className={className}>{label}</div>
    <Controller
      name={name}
      control={control}
      defaultValue={dValue}
      render={({ field }) => <TextField {...field} />}
    />
    <p className="text-danger">
      {errors &&
        errors[name]?.message &&
        label + " is required. \t" + errors[name]?.message}
    </p>
  </>
);

export const CTextInput = ({
  label,
  name,
  control,
  className,
  dValue,
  required,
  errors,
}) => (
  <>
    <div className={className}>{label}</div>
    <Controller
      name={name}
      control={control}
      defaultValue={dValue}
      render={({ field }) => <Input {...field} />}
    />
    <p className="text-danger">
      {errors &&
        errors[name]?.message &&
        label + " is required. \t" + errors[name]?.message}
    </p>
  </>
);

export const CSelect = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
}) => (
  <>
    <div className={className}>{label}</div>
    <Controller
      name={name}
      isClearable
      control={control}
      render={({ field }) => <ReactSelect {...field} options={options}
      onChange={(e) => field.onChange(e)}
      selected={field.value}
       />}
    />
    <p className="text-danger">
      {errors &&
        errors[name]?.message &&
        label + " is required. \t" + errors[name]?.message}
    </p>
  </>
);
export const CCheckBox = ({
  label,
  name,
  defaultValue,
  control,
  required,
  className,
  errors,
}) => (
  <>
    <label className={className}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: required }}
        render={({ field }) => <Checkbox {...field} />}
      />
      {label}
    </label>
    <p className="text-danger">
      {errors &&
        errors[name]?.message &&
        label + " is required. \t" + errors[name]?.message}
    </p>
  </>
);

export const CDatePicker = ({ name, label, control, errors }) => (
  <>
    <section>
      <label>{label}</label>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field }) => (
          <ReactDatePicker
            className="input"
            placeholderText="Select date"
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        )}
      />
    </section>
  </>
);
