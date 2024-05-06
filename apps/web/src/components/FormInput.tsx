import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormikHandlers } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

interface FormInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
  value: string;
  isError: boolean;
  error: string | undefined;
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
  value,
  error,
  isError,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-600' : ''}>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={isError ? 'border-red-600' : ''}
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormInput;