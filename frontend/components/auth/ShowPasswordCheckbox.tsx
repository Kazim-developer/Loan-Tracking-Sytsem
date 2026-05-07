import { ShowPassword } from "@/validators/showPassword.validator";

export default function ShowPasswordCheckbox({
  showPassword,
  setShowPassword,
}: ShowPassword) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="checkbox"
        onChange={() => setShowPassword(!showPassword)}
        className="w-4 h-4 accent-black"
      />
      <label htmlFor="checkbox" className="text-sm text-gray-700">
        Show Password
      </label>
    </div>
  );
}
