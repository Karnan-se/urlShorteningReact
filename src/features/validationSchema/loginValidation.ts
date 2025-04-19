import * as Yup from "yup";

const passwordRules = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  )
  .matches(/^\S*$/, "Password must not contain spaces");

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: passwordRules,
});

export const RegisterValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string()
    .required("Name is required")
    .trim() // removes leading and trailing spaces
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .test(
      "no-empty-spaces",
      "Name cannot be empty or just spaces",
      (value) => !!value && value.trim().length > 0
    ),
  password: passwordRules,
});
