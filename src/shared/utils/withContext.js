import {createContext, useContext} from 'react';

const SocketContext = createContext(undefined);
const SubmitIdContext = createContext(undefined);

const withSocketContext = (ComposedComponent) => {
  return (props) => {
    const context = useContext(SocketContext);
    return <ComposedComponent {...context} {...props}/>;
  };
};

const withSubmitIdContext = (ComposedComponent) => {
  return (props) => {
    const context = useContext(SubmitIdContext);
    return <ComposedComponent {...context} {...props}/>;
  };
};

function useSocketContext () {
  return useContext(SocketContext);
}

function useSubmitIdContext () {
  return useContext(SubmitIdContext);
}

export {
  SocketContext,
  SubmitIdContext,
  useSocketContext,
  useSubmitIdContext,
  withSocketContext,
  withSubmitIdContext,
};
