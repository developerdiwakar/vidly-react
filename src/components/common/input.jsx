import React, { Component } from "react";

const Input = ({ name, label, error, disabled, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        {...rest}
        className="form-control"
        disabled={disabled}
      />
      {error && <em className="text-danger">{error}</em>}
    </div>
  );
};

export default Input;
