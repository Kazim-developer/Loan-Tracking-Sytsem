import { ShowPassword } from "@/validators/showPassword.validator";

export default function ShowPasswordCheckbox({
  showPassword,
  setShowPassword,
}: ShowPassword) {
  return (
    <label>
      <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />{" "}
      Show Password
    </label>
  );
}
