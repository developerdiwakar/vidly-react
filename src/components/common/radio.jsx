import React from "react";

const Radio = ({ name, label, options, value, classname, error, ...rest }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {options.values.map((option, index) => (
        <div key={"div" + name + index} className={classname}>
          <input
            key={index}
            className="form-check-input"
            type="radio"
            name={name}
            id={name + index}
            value={option}
            checked={options.defaultChecked == option ? "checked" : ""}
            {...rest}
          />
          <label className="form-check-label" htmlFor={name + index}>
            {option}
          </label>
        </div>
      ))}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Radio;
