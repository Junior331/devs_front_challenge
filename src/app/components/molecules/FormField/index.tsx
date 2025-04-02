import { FormFieldProps } from "./@types";

export function FormField({ label, htmlFor, error, children, className }: FormFieldProps) {
  return (
    <div className={`space-y-1 w-full ${className}`}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}