import React, { useState } from 'react';
import { Formik } from 'formik'
import './App.css'
import axios from 'axios'
import validationsSchema from './validation'
import { Input } from "./Input"

let initialValues = {
  email: '',
  password: '',
}


function App() {
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    try {
      await axios.post(`https://${process.env.REACT_APP_API}`, {

        email: values.email,
        password: values.password
      });
    } catch (error) {
      setError(error.message);
    }
  };






  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={`form`}>
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              value={values.email}
              setError={setError}
              handleBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              value={values.password}
              setError={setError}
              handleBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
            />

            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type={`submit`}
            >Send</button>
            {error && (
              <p id='errorAlert' className='error-user'>
                User not found
              </p>
            )}
          </div>
        )}
      </Formik>
    </div>
  );

}
export default App;
