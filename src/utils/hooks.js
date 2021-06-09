import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export function useValueDebounce (value, delay) {
  const isMountedRef = useRef(false);
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    let handler = null;
    if (isMountedRef.current) {
      handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }
    // Return a cleanup function that will be called every time ...
    // ... useEffect is re-called. useEffect will only be re-called ...
    // ... if value changes (see the inputs array below).
    // This is how we prevent debouncedValue from changing if value is ...
    // ... changed within the delay period. Timeout gets cleared and restarted.
    // To put it in context, if the user is typing within our app's ...
    // ... search box, we don't want the debouncedValue to update until ...
    // ... they've stopped typing for more than 500ms.
    isMountedRef.current = true;
    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);
  return debouncedValue;
}

export function usePrevious (value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useDidMountEffect (cb) {
  // Essa cb só deve rodar na montagem do componente
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
}

export function useDidUpdateEffect (cb, dependencies) {
  const isInitialMountRef = useRef(true);
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
    } else {
      return cb();
    }
    return () => null;
    // Essa cb roda de acordo com as alterações das dependências
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export function useWillUnmountEffect (cb, dependencies = []) {
  useEffect(() => {
    return cb;
    // Essa cb só deve rodar na montagem do componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export function useInitValues (cb) {
  // Não sei bem porque não pode
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(cb, []);
}
