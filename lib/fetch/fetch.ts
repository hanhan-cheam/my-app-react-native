import * as SecureStore from "expo-secure-store";

export class FetchWrapper {
  private _baseUrl: string;
  private _timeout: number;

  constructor({
    baseUrl,
    timeout = 30000,
  }: {
    baseUrl: string;
    timeout?: number;
  }) {
    this._baseUrl = baseUrl;
    this._timeout = timeout;
  }

  private async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync("accessToken");
  }

  private async getHeaders(body?: unknown): Promise<Record<string, string>> {
    const headers: Record<string, string> = {};

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const token = await this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private getFullUrl(
    endpoint: string,
    params?: Record<string, unknown>,
  ): string {
    const fullUrl = `${this._baseUrl}${endpoint}`;
    if (!params || Object.keys(params).length === 0) return fullUrl;

    const searchParams = new URLSearchParams(params as Record<string, string>);
    return `${fullUrl}?${searchParams.toString()}`;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this._timeout);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }

  async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T> {
    const url = this.getFullUrl(endpoint, params);
    const headers = await this.getHeaders(body);

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await this.fetchWithTimeout(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw { response, data };
    }

    return data as T;
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, params);
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, body, params);
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, body, params);
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, body, params);
  }

  async delete<T>(
    endpoint: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, body, params);
  }
}