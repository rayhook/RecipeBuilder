const Input = ({ labelName, children, inputRef, value, handleInputChange, placeholder }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={labelName}>
        {children}
      </label>
      <div className="control">
        <input
          placeholder={placeholder}
          id={labelName}
          name={labelName}
          value={value}
          ref={inputRef}
          required
          className="input is-success"
          onChange={handleInputChange}
          type="text"
        />
      </div>
    </div>
  );
};

export default Input;
