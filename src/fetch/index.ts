interface IResponse {
  ok: boolean; // 200-299 status code range
  status: string;
  statusText: string;
  url: string;
  clone: IResponse;
  json: () => Promise<any>;
  headers: {
    keys: () => [string];
    entries: () => string[][]; // 2D matrix as [key, value]
    get: (header: string) => string;
    has: (header: string) => Boolean; // Check for existence of key argument in the keys of the headers object
  };
}

export default (typeof fetch === 'function'
  ? fetch.bind()
  : (url: string, options): Promise<IResponse> => {
      options = options || {};

      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open(options.method || 'get', url, true);

        for (let header in options.headers) {
          request.setRequestHeader(header, options.headers[header]);
        }

        request.withCredentials = options.credentials === 'include';

        request.onload = () => resolve(response());

        request.onerror = reject;

        request.send(options.body);

        const response = () => {
          let keys = [];
          let all = [];
          let headers = {};
          let header;

          request.getAllResponseHeaders().replace(/^(.*?):\s*?([\s\S]*?)$/gm, (_, key, value) => {
            keys.push((key = key.toLowerCase()));
            all.push([key, value]);
            header = headers[key];
            headers[key] = header ? `${header},${value}` : value;
          });

          return {
            ok: ((request.status / 100) | 0) === 2,
            status: request.status,
            statusText: request.statusText,
            url: request.responseURL,
            clone: response,
            json: () => Promise.resolve(request.responseText).then(JSON.parse),
            headers: {
              keys: () => keys,
              entries: () => all,
              get: key => headers[key.toLowerCase()],
              has: key => key.toLowerCase() in headers
            }
          };
        };
      });
    });
