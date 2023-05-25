// components/FormInput.tsx
interface FormInputProps {
  inputLabel: string;
  labelFor: string;
  inputType: string;
  inputId: string;
  inputName: string;
  placeholderText: string;
  ariaLabelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const FormInput: React.FC<FormInputProps> = ({
  inputLabel,
  labelFor,
  inputType,
  inputId,
  inputName,
  placeholderText,
  ariaLabelName,
  onChange,
  value,
}) => {
  return (
    <div className="font-general-regular mb-4">
      <label
        className="block text-lg text-dark-2 dark:text-light-2 mb-1"
        htmlFor={labelFor}
      >
        {inputLabel}
      </label>
      <input
        className="w-full px-5 py-2 border text-dark-2 dark:text-light-2 bg-white dark:bg-black border-dark-2 dark:border-light-2 rounded-md shadow-sm text-md"
        type={inputType}
        id={inputId}
        name={inputName}
        placeholder={placeholderText}
        aria-label={ariaLabelName}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export default FormInput;
