import * as z from "zod";

export const login_validation_schema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email()
    .nonempty("email is required"),
  password: z
    .string({ required_error: "password is required" })
    .nonempty("password is required"),
});


export const sign_up_user_validation_schema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, { message: "At least 2 characters" })
    .max(50, { message: "Not than 50 character" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(2, { message: "At least 2 characters" })
    .max(50, { message: "Not than 50 character" }),
  email: z.string({ required_error: "email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "At least 2 characters" })
    .max(30, { message: "Not than 50 character" }),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }),
});

export const password_reset_mail_validation_schema = z.object({
  email: z.string().email().nonempty("email is required"),
});

export const new_password_validator_schema = z.object({
  password: z.string().nonempty("password is required"),
  confirmPassword: z
    .string({ required_error: "confirm password is required" })
    .nonempty("confirmation password is required"),
});

export const validatePassword = (password, stateAction) => {
  // has uppercase letter
  if (password.toLowerCase() !== password) {
    stateAction((oldState) => ({ ...oldState, hasUppercase: true }));
  } else {
    stateAction((oldState) => ({ ...oldState, hasUppercase: false }));
  }

  // has lowercase letter
  if (password.toUpperCase() !== password) {
    stateAction((oldState) => ({ ...oldState, hasLowercase: true }));
  } else {
    stateAction((oldState) => ({ ...oldState, hasLowercase: false }));
  }

  // has number
  if (/\d/.test(password)) {
    stateAction((oldState) => ({ ...oldState, hasNumber: true }));
  } else {
    stateAction((oldState) => ({ ...oldState, hasNumber: false }));
  }

  // has special character
  if (/[~`!._#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) {
    stateAction((oldState) => ({ ...oldState, hasSpecialChar: true }));
  } else {
    stateAction((oldState) => ({ ...oldState, hasSpecialChar: false }));
  }

  // has 8 characters
  if (password.length >= 8) {
    stateAction((oldState) => ({ ...oldState, hasAtLeast8Char: true }));
  } else {
    stateAction((oldState) => ({ ...oldState, hasAtLeast8Char: false }));
  }
};
