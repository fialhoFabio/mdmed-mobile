import React from 'react';
import PropTypes from 'prop-types';

function FormElement ({children, className}) {
  return (
    <div>
      {children}
    </div>
  );
}

FormElement.propTypes = {
  children: PropTypes.node, // No componente Assinatura, por exemplo, pode não ter chidlren
  className: PropTypes.string,
};

export default FormElement;
