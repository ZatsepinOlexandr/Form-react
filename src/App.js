import React from 'react';
import { Formik } from 'formik'
import './App.css'
import axios from 'axios'
import validationsSchema from './validation'

let initialValues = {
  email: '',
  password: '',
}


function App() {

  const onSubmit = (values) => {
    axios.post(`https://${process.env.REACT_APP_API}`, {

      email: values.email,
      password: values.password
    })
      .then(response => {
        switch (response.status) {
          case 500:
            let error = document.getElementById('errorAlert');
            error.className.remove('none');
            break;

          default:
        }
      })
  }




  return (
    <div>
      <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
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
