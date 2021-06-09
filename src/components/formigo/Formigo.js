import React from 'react';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
//

// import TextInput from './text-input/TextInput';

import Input from './text-input/Input';

function Formigo (props) {
  const {
    children,
  } = props;

  return (
    <Formik
      initialValues = {{}}
      onSubmit = {(values) => {
        console.log(values);
      }}
    >
      {({handleChange, handleSubmit, values}) => children(handleChange, handleSubmit, values)}
    </Formik>
  );
}

Formigo.propTypes = {
  children: PropTypes.func,
};

export {
  Input,
};

export default Formigo;
