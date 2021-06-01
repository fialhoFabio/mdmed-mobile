// const credentials = 'same-origin'; // somente requisições no mesmo host
const credentials = 'include'; // requisições em qualquer host (para usar api)

const headers = {
  // 'Accept': 'application/json', // pra receber no formato json
  'X-Requested-With': 'XMLHttpRequest', // Pra API conseguir diferenciar requisição da convencional
};

function resolveApiUrl (url) {
  return 'https://api.mdmed.clinic' + url;
}

export function fetchDelete (url, data) {
  return fetch(resolveApiUrl(url), {
    body: JSON.stringify(data),
    credentials,
    headers,
    method: 'delete',
  });
}

export function fetchGet (url) {
  return fetch(resolveApiUrl(url), {credentials, headers});
}

export function fetchPost (url, data) {
  return fetch(resolveApiUrl(url), {
    body: JSON.stringify(data),
    credentials,
    headers,
    method: 'post',
  });
}

export function fetchRequest (operation, url, data) {
  switch (operation) {
    case 'delete':
      return fetchDelete(url, data);
    case 'load':
      return data ? fetchPost(url, data) : fetchGet(url);
    default:
      return fetchPost(url, data);
  }
}
