import { useFormContext } from "react-hook-form";

const InputField = ({ name, label, type = "text", placeholder, required, disabled }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register(name, { required: `${label} is required` })}
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputField;

