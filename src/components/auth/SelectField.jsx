import { useFormContext } from "react-hook-form";

const SelectField = ({ name, label, options = [], required }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        {...register(name, { required: `${label} is required` })}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">Choose a Gender</option>
        {options.map((gender) => (
          <option key={gender} value={gender}>
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectField;
