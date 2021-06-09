export function appResetState () {
  return {
    type: 'APP_RESET_STATE',
  };
}

export function appSetValue (keyPath, newValue) {
  return {
    keyPath,
    newValue,
    type: 'APP_SET_VALUE',
  };
}

/**
 */

export function routeFetchSetAbortState () {
  return {
    state: {
      isRouteFetching: false,
    },
    type: 'ROUTE_FETCH_SET_ABORT_STATE',
  };
}

export function routeFetchSetCompleteState (state) {
  return {
    state,
    type: 'ROUTE_FETCH_SET_COMPLETE_STATE',
  };
}

export function routeFetchSetErrorState (feedback) {
  return {
    state: {
      feedback,
      isRouteFetching: false,
    },
    type: 'ROUTE_FETCH_SET_ERROR_STATE',
  };
}

export function routeFetchSetStartState () {
  return {
    state: {
      isCompleteState: false,
      isInvalidState: false, // Ao começar uma rota o state deve ser considerado sempre válido
      isRouteFetching: true,
      yiiEnv: null,
    },
    type: 'ROUTE_FETCH_SET_START_STATE',
  };
}

/**
 */

export function fetchSetAbortState () {
  return {
    state: {
      isFetching: false,
      isHiddenFetching: false,
      urlFetching: null,
    },
    type: 'FETCH_SET_ABORT_STATE',
  };
}

export function fetchSetCompleteState (feedback) {
  const state = {
    isFetching: false,
    isHiddenFetching: false,
    urlFetching: null,
  };
  if (typeof feedback !== 'undefined') {
    state.feedback = feedback;
  }
  return {
    state,
    type: 'FETCH_SET_COMPLETE_STATE',
  };
}

export function fetchSetErrorState (feedback) {
  return {
    state: {
      feedback,
      isFetching: false,
      isHiddenFetching: false,
      urlFetching: null,
    },
    type: 'FETCH_SET_ERROR_STATE',
  };
}

export function fetchSetStartState ({isFetching, isHiddenFetching, urlFetching}) {
  return {
    state: {
      isFetching,
      isHiddenFetching,
      urlFetching,
    },
    type: 'FETCH_SET_START_STATE',
  };
}
