const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  rows,
  min,
  max,
  step,
  className = '',
  ...props
}) => {
  const hasError = touched && error;
  const inputClasses = `input ${hasError ? 'input-error' : ''} ${className}`;

  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    required,
    disabled,
    className: inputClasses,
    'aria-invalid': hasError ? 'true' : 'false',
    'aria-describedby': hasError ? `${name}-error` : undefined,
    ...props,
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="label">
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea {...inputProps} rows={rows || 4} />
      ) : type === 'range' ? (
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {label}: {value}%
            </span>
          </div>
          <input
            {...inputProps}
            type="range"
            min={min || 0}
            max={max || 100}
            step={step || 1}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      ) : (
        <input {...inputProps} type={type} />
      )}
      
      {hasError && (
        <p id={`${name}-error`} className="error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;