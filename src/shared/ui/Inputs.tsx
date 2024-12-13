import React from "react";
import { Input } from "../../components/ui/input";

interface IinputProps {
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }

const Inputs : React.FC<IinputProps> = ({ name, type, label, value, onChange, error }) => {

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <p id={`${name}-error`} className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Inputs;
