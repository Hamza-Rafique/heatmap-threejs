import React, { useCallback, useState } from "react";
import "./style.css";
const Select = ({
  name,
  value,
  required = false,
  onChangeListener,
  options,
  addOption = false,
  addAction = () => {},
  errorMessage = "",
  regex = /^.*$/,
  styleCont = {}
}) => {
  const [error, setError] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      onChangeListener(inputValue);
      setError(!regex.test(inputValue));
    },
    [onChangeListener, regex]
  );

  return (
    <>
      {/* Custom styles for select box (optional) */}
      <style>{`.error-message.active { color: red; } .select-box { display: flex; flex-direction: column; margin-bottom: 10px; } .form-control { padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc; }`}</style>
      
      <div style={styleCont} className="select-box">
        <p className="form-label">
          {name} {required && <span className="error-message active">*</span>}
        </p>

        {addOption && (
          <button className="small-button-unq" onClick={addAction}>
            Add Option
          </button>
        )}

        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-control"
        >
          {options.map(({ label, value: valueOption, hex, border, disabled }) => (
            <option
              key={valueOption}
              disabled={disabled}
              style={{ background: hex, border: `1px solid ${border}` }}
              value={valueOption}
            >
              {label}
            </option>
          ))}
        </select>
      </div>

      {error && <small className="error-message">{errorMessage}</small>}
    </>
  );
};

export default Select;
