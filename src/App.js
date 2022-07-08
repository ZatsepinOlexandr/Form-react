import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
import './App.css'
import axios from 'axios'


function App() {
  const validationsSchema = yup.object().shape({
    email: yup.string().email('Enter the correct email').required('Necessarily'),
    password: yup.string()
      .typeError('Must be a string')
      .required('Necessarily')
      .max(8, "Maximum is 8 symbol")
      .matches(/[a-zA-Z]/, "Must include letters")
      .matches(/[&,!,_,#]/, "Must include special symbol (&,!,etc.)"),
  })


  function handleSubmit(values) {
    axios.post('https://lysiukapi.herokuapp.com/users/login', {

      email: values.email,
      password: values.password
    })
      .then(response => {
        switch (response.status) {
          case 500:
            let error = document.getElementById('errorAlert');
            error.className.remove('none');
            break;
        }
      })
  }


  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={(values) => { handleSubmit(values) }}
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
            <p id='errorAlert' className='error-user none'>User not found</p>
          </div>
        )}
      </Formik>
    </div>
  );

}
export default App;
