import * as yup from 'yup'

const validationsSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter the correct email')
      .required('Necessarily'),
    password: yup
      .string()
      .required('Necessarily')
      .max(8, "Maximum is 8 symbol")
      .matches(/[a-zA-Z]/, "Must include letters")
      .matches(/[&,!,_,#]/, "Must include special symbol (&,!,etc.)"),
  })

  export default validationsSchema