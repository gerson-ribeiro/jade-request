import HttpMethod from "../models/HttpMethod";

interface IRequesterProps {
  url: string;
  body?: any;
  headers?: {
    name: string;
    value: any;
  }[];
  responseType?: XMLHttpRequestResponseType;
}
const Requester = ({
  url,
  body,
  headers = null,
  responseType = null,
}: IRequesterProps) => {
  const _url = url.endsWith("/") ? url : `${url}/`;
  const _xhr = new XMLHttpRequest();
  _xhr.responseType = responseType ?? "json";

  const _insertHeaders = () => {
    if (!headers) return;
    for (let i = 0; i < headers.length; i++) {
      const head = headers[i];

      _xhr.setRequestHeader(head.name, head.value);
    }
  };
  const _setHeaders = (name, value) => {
    _xhr.setRequestHeader(name, value);
  };

  const _setDefaultHeaders = () => {
    _setHeaders("Content-Type", "application/json");
    _setHeaders("Access-Control-Allow-Origin", "*");
  };

  const setWithCredentials = (credentials) =>
    (_xhr.withCredentials = credentials);

  const _configure = (method, endpoint) => {
    if (!_url) throw new Error("É necessário informar a URL!");
    _xhr.open(method, _url + endpoint);
    _setDefaultHeaders();
    _insertHeaders();
  };

  const get = (endpoint) => {
    _configure(HttpMethod.GET, endpoint);

    return _send_request();
  };

  const post = (endpoint) => {
    _configure(HttpMethod.POST, endpoint);

    return _send_request(body);
  };

  const formData = (endpoint) => {
    _configure(HttpMethod.POST, endpoint);

    return _send_request(body);
  };

  const put = (endpoint) => {
    _configure(HttpMethod.PUT, endpoint);

    return _send_request(body);
  };

  const hDelete = (endpoint) => {
    _configure(HttpMethod.DELETE, endpoint);

    return _send_request();
  };

  /**
   *
   * @param { requisitionBody } data body to be send
   * @param {*} timeout
   * @returns Promise
   */
  const _send_request = (timeout = 60000) =>
    new Promise((resolve, reject) => {
      _xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          resolve(this.response);
          clearTimeout();
        }
      };
      _xhr.send(body ? JSON.stringify(body) : null);
      if (timeout) {
        setTimeout(() => {
          reject("timeout");
          if (_xhr) _xhr.abort();
        }, timeout);
      }
    });

  return {
    setWithCredentials,
    doRequest: {
      get,
      post,
      formData,
      put,
      delete: hDelete,
    },
  };
};
export default Requester;
