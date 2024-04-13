import Cookies from 'js-cookie';

/* eslint-disable @typescript-eslint/no-explicit-any */
class BackendFetching {
  baseApiUrl?: string;
  backendApiUrl?: string;

  constructor() {
    this.baseApiUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API
        : process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API;
    this.backendApiUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_APP_LOCAL_BACKEND_API + '/api/v2/'
        : process.env.NEXT_PUBLIC_APP_PROD_BACKEND_API + '/api/v2/';
  }

  httpCallable(url: string): (configs: RequestInit) => Promise<Response> {
    return async (configs: any) =>
      await fetch(this.backendApiUrl + url, {
        ...configs,
        headers: !configs.noContentType
          ? {
              'Content-Type': 'application/json',
              ...configs?.headers
            }
          : { ...configs?.headers }
      });
  }

  httpAuthenticatedCallable(
    url: string
  ): (configs: RequestInit | any) => Promise<Response> {
    const accessToken = Cookies.get('accessToken');

    return async (configs: any) =>
      await fetch(this.backendApiUrl + url, {
        ...configs,
        headers: {
          ...(configs?.headers ?? {}),
          Authorization: 'Bearer ' + accessToken,
          ...(!configs.noContentType
            ? { 'Content-Type': 'application/json' }
            : {})
        }
      });
  }

  /**
   * home endpoints
   */

  async getAllPokemons(page: number) {
    const url = `/pokemon?limit=15&offset=${page}`;
    return await this.httpCallable(url)({
      mode: 'cors',
      method: 'GET'
    });
  }

  async getPokemonById(id: string) {
    const url = '/pokemon/' + (id ?? '');
    return this.httpCallable(url)({
      mode: 'cors',
      method: 'GET'
    });
  }

  async getDataFromCompleteURL(url: string) {
    return fetch(url, {
      mode: 'cors',
      method: 'GET'
    });
  }
}

export default BackendFetching;
