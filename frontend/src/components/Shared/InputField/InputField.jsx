import React from "react";
import "./inputField.scss";

const InputField = ({type, label, value, onChange, classname, min, max}) => {
  return (
    <input 
        className={classname}
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
    />
  );
};

export default InputField;
