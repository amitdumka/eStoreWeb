import React from 'react';

// The following component is an example of your existing Input Component
export const TextIn = ({ label,name, register, required }) => (
  <>
    <label>{label}</label>
    <input {...register(name, { required })} />
  </>
);
export const NumberIn = ({ label,name, register, min,max, required }) => (
  <>
    <label>{label}</label>
    <input type="number" {...register(name, {min:min, max:max, required:required })} />
  </>
);

// you can use React.forwardRef to pass the ref too
export const SelectIn = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));
