export function setHeaders(token?: string) {
  const headers = token
    ? {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        Accept: 'application/json',
        'Content-type': 'application/json',
      };
  return headers as HeadersInit;
}
