import {useEffect} from 'react';
// import {useLocation} from 'react-router-dom';
import {
  useDispatchAppSetValue,
  useDispatchRouteFetchGet,
  useSelectorAppValue,
} from './hooks';

// TODO Complicated
function useShouldReload () {
  const location = {pathname: '/', search: ''};
  const {pathname, search} = location;
  const routeFetchGet = useDispatchRouteFetchGet();
  const setShouldReload = useDispatchAppSetValue(['shouldReload']);
  const shouldReload = useSelectorAppValue(['shouldReload']);
  useEffect(() => {
    if (shouldReload) {
      routeFetchGet(pathname + search);
      setShouldReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReload]);
  return setShouldReload;
}

export default useShouldReload;
