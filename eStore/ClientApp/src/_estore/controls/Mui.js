import * as React from "react";
import { Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ReactDatePicker from "react-datepicker";
//import NumberFormat from "react-number-format";
import InputMask from "react-input-mask";
//import MuiAutoComplete from "./MuiAutoComplete";

export const MUIDatePicker = ({
  label,
  name,
  control,
  options,
  className,
  required,defaultValue,
  errors,
}) => (
  <section>
    <label className={className}>{label} </label>
    <br />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            {...rest}
          />
        )}
      />
    </MuiPickersUtilsProvider>
    <p className="text-danger">
      {errors &&
        errors[name]?.message &&
        label + " is required. \t" + errors[name]?.message}
    </p>
  </section>
);

export const MUICheckBox = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
}) => (
  <section>
    <label className={className}>{label} </label>
    <br />
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          onChange={(e) => field.onChange(e.target.checked)}
          checked={field.value}
        />
      )}
    />
    <p className="text-danger">
      {errors &&
        errors[name]?.message &&
        label + " is required. \t" + errors[name]?.message}
    </p>
  </section>
);

// Send label and Value in a list or key pair , then do for/foreach loop and create radio button(S)
export const MUIRadioGroup = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        render={({ field }) => (
          <RadioGroup aria-label="gender" {...field}>
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        )}
        name={name}
        control={control}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

export const MUIText = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        render={({ field }) => <TextField {...field} />}
        name={name}
        control={control}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);
export const MUINumber = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
  defaultValue,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        render={({ field }) => (
          <TextField      
            {...field}
            type="number"
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue ? defaultValue : "0"}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

export const MUISelect = ({
  label,
  name,
  control,
  options,
  className,
  required,
  defaultValue,
  errors,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        render={({ field }) => (
          <Select {...field}>
            {console.log(options)}
           { options && options.map((item) => (<MenuItem key={item.value}value={item.value}>{item.label}</MenuItem>))}
          </Select>
        )}
        name={name}
        defaultValue={defaultValue}
        control={control}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

export const MUISlider = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
  max,
  step,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        name={name}
        control={control}
        defaultValue={[0, 10]} //need to set default or this value
        render={({ field }) => (
          <Slider
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            valueLabelDisplay="auto"
            max={max}
            step={step}
          />
        )}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

export const MUISwitch = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
          />
        )}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

//Current it is set for tel (telephone check for futher uses)
export const MUIMaskInput = ({
  label,
  name,
  control,
  options,
  className,
  required,
  errors,
  mask,
}) => (
  <>
    {/* "99/99/9999" */}
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputMask mask={mask} value={value} onChange={onChange}>
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
                className="input"
                disableUnderline
              />
            )}
          </InputMask>
        )}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

export const MUIRDatePicker = ({
  label,
  name,
  control,
  options,
  className,
  required,
  defaultValue,
  errors,
}) => (
  <>
    <section>
      <label className={className}>{label} </label>
      <br />
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue ? defaultValue : new Date()}
        render={({ field }) => (
          <ReactDatePicker
            className="input"
            placeholderText="Select date"
            onChange={(e) => field.onChange(e)}
            selected={field.value}
            
          />
        )}
      />
      <p className="text-danger">
        {errors &&
          errors[name]?.message &&
          label + " is required. \t" + errors[name]?.message}
      </p>
    </section>
  </>
);

// export const MUINumberFormat = ({
//   label,
//   name,
//   control,
//   options,
//   className,
//   required,
//   defaultValue,
//   errors,
// }) => (
//   <>
//     <section>
//       <label className={className}>{label} </label>
//       <br />
//       <Controller
//         render={({ field }) => (
//           <NumberFormat
//             defaultValue={defaultValue ? defaultValue : 0}
//             {...field}
//           />
//         )}
//         thousandSeparator
//         name={name}
//         className="input"
//         control={control}
//       />
//       <p className="text-danger">
//         {errors &&
//           errors[name]?.message &&
//           label + " is required. \t" + errors[name]?.message}
//       </p>
//     </section>
//   </>
// );

export const CashDetail = ({
  label,
  name,
  control,
  className,
  defaultValue,
  errors,
  options,
}) => (
  <section>
    <label className={className}>{label} </label>
    <br />
    <Controller
      render={({ field }) => (
        <section>
          <>
            <TextField
              name="coin1"
              defaultValue={defaultValue ? defaultValue : 0}
              {...field}
              type="number"
            />
            <p className="text-danger">
              {errors &&
                errors[name.coin1]?.message &&
                label + " is required. \t" + errors[name.coin1]?.message}
            </p>
          </>
          <>
            <TextField
              name="coin2"
              defaultValue={defaultValue ? defaultValue : 0}
              {...field}
              type="number"
            />
            <p className="text-danger">
              {errors &&
                errors[name.coin1]?.message &&
                label + " is required. \t" + errors[name.coin1]?.message}
            </p>
          </>
        </section>
      )}
      name="cashDetail"
      control={control}
    />
  </section>
);


// <label htmlFor="muiPriceInCents">Material UI Price</label>
//         <Controller
//           name="muiPriceInCents"
//           control={form.control}
//           render={({ field }) => <MuiCurrencyFormat {...field} />}
//         />

// const MuiCurrencyFormat = ({ onChange, value, ...rest }) => {
//     const [currency, setCurrency] = React.useState(value / 100);
//     return (
//       <NumberFormat
//         customInput={TextField}
//         {...rest}
//         value={currency}
//         fullWidth
//         thousandSeparator={true}
//         decimalScale={2}
//         onValueChange={(target) => {
//           setCurrency(target.floatValue);
//           onChange(target.floatValue * 100);
//         }}
//         isNumericString
//         prefix="$ "
//       />
//     );
//   };