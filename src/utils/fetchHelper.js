import {resolveApiUrl} from '../shared/utils/helper';

// const credentials = 'same-origin'; // somente requisições no mesmo host
const credentials = 'include'; // requisições em qualquer host (para usar api)

const headers = {
  // 'Accept': 'application/json', // pra receber no formato json
  'X-Requested-With': 'XMLHttpRequest', // Pra API conseguir diferenciar requisição da convencional
};

export function isJson (response) {
  return response.headers.get('Content-Type').indexOf('application/json') > -1;
}

export function fetchDelete (url, bodyParams, signal) {
  return fetch(resolveApiUrl(url), {
    body: JSON.stringify(bodyParams),
    credentials,
    headers,
    method: 'delete',
    signal,
  });
}

export function fetchGet (url, signal) {
  return fetch(resolveApiUrl(url), {
    credentials,
    headers,
    signal,
  });
}

export function fetchPost (url, bodyParams, signal) {
  return fetch(resolveApiUrl(url), {
    body: JSON.stringify(bodyParams),
    credentials,
    headers,
    method: 'post',
    signal,
  });
}

export function fetchSubmit (url, formData, signal) {
  if (!(formData instanceof FormData)) {
    throw new Error('Pra usar o fetchSubmit os dados precisam ser enviados usando o FormData');
  }
  return fetch(resolveApiUrl(url), {
    body: formData,
    credentials,
    headers,
    method: 'post',
    signal,
  });
}
