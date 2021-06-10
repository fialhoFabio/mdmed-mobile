import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import {fetchPost} from '../../utils/fetchHelper';
//
import Input from './text-input/Input';

function Formigo (props) {
  const {
    action,
    children,
    modelName,
  } = props;

  const [errors, setErrors] = useState({});

  return (
    <Formik
      initialValues = {{}}
      onSubmit = {(values) => {
        const formValues = {};
        formValues[modelName] = values;
        fetchPost(action, formValues).then((res) => res.text())
          .then((res) => {
            const parsedResponse = JSON.parse(res);
            if (parsedResponse.feedback.type === 'success') {
              // redirect
            } else if (parsedResponse.feedback.type === 'error') {
              setErrors(parsedResponse.feedback.modelErrors.errors);
            }
          });
      }}
    >
      {({handleChange, handleSubmit, values}) => children(errors, handleChange, handleSubmit, values)}
    </Formik>
  );
}

Formigo.propTypes = {
  action: PropTypes.string,
  children: PropTypes.func,
  modelName: PropTypes.string,
};

export {
  Input,
};

export default Formigo;
