import * as yup from 'Yup'

export const SignUpSchema = yup.object({
  firstName:yup.string().required("Please enter First Name"),
  lastName:yup.string().required("Please enter Last Name"),
  address:yup.string().required("Please enter Address"),
  phoneNumber:yup.string().required("Please enter Phone Number"),
  emailAddress:yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email must be a valid email address"
  ).required("Please enter Email"),
  password: yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
    isTnCApplied:yup.string().required("Please checked Terms & Conditions "),
})

export const SignInSchema = yup.object({
    emailAddress:yup.string().matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email must be a valid email address"
    ).required("Please enter Email"),
    password: yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  })