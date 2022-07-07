import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import './App.css'


function App() {
  const validationsSchema = yup.object().shape({
    email: yup.string().email('Enter the correct email').required('Necessarily'),
    password: yup.string()
    .typeError('Must be a string')
    .required('Necessarily')
    .max(8,"Maximum is 8 symbol")
    .matches(/[a-zA-Z]/, "Must include letters")
    .matches(/[&,!,_,#]/, "Must include special symbol (&,!,etc.)"),
  })

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => { console.log(values) }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={`from`}>
            <p>
              <label htmlFor={`email`}>Email</label><br />
              <input
                className={'input'}
                type={`email`}
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </p>
            {touched.email && errors.email && <p className={'error'}>{errors.email}</p>}
            <p>
              <label htmlFor={`password`}>Password</label><br />
              <input
                className={'input'}
                type={`password`}
                name={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.password && errors.password && <p className={'error'}>{errors.password}</p>}


            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type={`submit`}
            >Send</button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default App;