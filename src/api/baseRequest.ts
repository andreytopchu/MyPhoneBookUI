export const BASE_URL = 'http://localhost:5000';

export interface IRequestBaseBody {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  body?: string | object | undefined;
}

export type RequestGenericType = string | object;

const request = async (url: string, data: IRequestBaseBody) => {
  const tokenForHeaders = localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {};
  const multiPartForHeaders = typeof data.body === 'string' ? { 'Content-Type': 'application/json; charset=utf-8' } : {};

  const response = await fetch(`${BASE_URL}/${url}`, {
    ...data,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    headers: {
      ...tokenForHeaders,
      ...multiPartForHeaders,
    },
  });
  if (response.ok) {
    if (response.headers.get('Content-Length') === '0') {
      return true;
    }
    const responseType = response.headers.get('Content-Type');
    let result;
    if (responseType === 'application/json') {
      result = await response.text();
      return result;
    }
    result = await response.json();
    return result;
  } else {
    console.log(response);
  }
};

export const get = (url: string) => request(url, { method: 'GET' });

export const post = async <T extends RequestGenericType>(url: string, body: T) => {
  return request(url, { method: 'POST', body });
};

export const remove = async (url: string) => request(url, { method: 'DELETE' });

export const put = async <T extends RequestGenericType>(url: string, body: T | undefined) => {
  return request(url, { method: 'PUT', body });
};
