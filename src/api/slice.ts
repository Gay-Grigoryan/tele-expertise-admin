/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosError, Method } from "axios";
import { _TOKEN_IS_EXPIRED_, _WRONG_REFRESH_TOKEN_ } from "./error-codes";
import { useCallback, useEffect, useRef, useState } from "react";
import { ResponseModel, RequestOptions } from "@/common/types/lib";
import { startGlobalLoading, stopGlobalLoading } from "@/common/components/global-loading-provider";

export type UseApiError = { code: number; message: string };
type UseApi<T> = { reload: () => Promise<void>; data: T | null; loading: boolean; error: UseApiError | null; success: boolean };

export default class ApiSlice {
  static baseURL: string = process.env.NEXT_PUBLIC_API_HOST!;
  static defaultAuth = false;

  static async request<T = unknown>(
    url = "",
    method: Method = "GET",
    payload: Record<string, unknown> | FormData | null = null,
    options: RequestOptions | null = null
  ): Promise<ResponseModel<T>> {
    let headers: { Authorization?: string; Timezone: string; "cache-control": string; pragma: string } = {
      Timezone: -new Date().getTimezoneOffset() / 60 + "",
      "cache-control": "no-cache",
      pragma: "no-cache"
    };

    if (this.defaultAuth || options?.auth) {
      headers.Authorization = `Bearer ${ApiSlice.token || process.env.TEST_TOKEN}`; // for most of requests;
    }

    if (options?.headers) headers = { ...headers, ...options.headers };

    try {
      const rsp =
        (await axios({
          method,
          url: this.baseURL + url,
          headers,
          data: payload || {},
          responseType: options?.responseType || "json"
        })) || {};
      if (["blob", "arraybuffer"].includes(options?.responseType + "")) {
        const blob = new Blob([rsp.data], { type: "image/jpeg" });
        const objectUrl = window.URL.createObjectURL(blob);
        return {
          meta: { error: null, status: rsp.status },
          data: {
            src: objectUrl
          } as any as T
        };
      }
      return rsp.data;
    } catch (err) {
      const response = (err as AxiosError<ResponseModel<T>>).response!.data;
      if (response.meta.error?.code === _TOKEN_IS_EXPIRED_ && !url.includes("refreshToken")) {
        if (await this.refreshToken()) {
          return this.request(url, method, payload, options);
        } else return response;
      } else if (response.meta.error?.code === _WRONG_REFRESH_TOKEN_) {
        if (ApiSlice.handleWrongRefreshToken) ApiSlice.handleWrongRefreshToken();
        return response;
      } else return response;
    }
  }

  static async refreshToken() {
    const rsp = await ApiSlice.request<{ accessToken: string }>(
      `/auth/refreshToken?refreshToken=${localStorage.getItem("refreshToken")}`
    );
    if (rsp.meta.error) return false;

    ApiSlice.setToken(rsp.data.accessToken);

    return true;
  }

  static handleWrongRefreshToken: null | (() => void) = null;

  static cache: Record<string, unknown> = {};

  static useApi<T>(fetcher: () => Promise<ResponseModel<T>>, params?: unknown[], cacheKey?: string): UseApi<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setUseApiError] = useState<UseApiError | null>(null);
    const fetchCount = useRef(0);
    useEffect(() => {
      startGlobalLoading();
    }, []);

    const getData = useCallback(
      async (force?: boolean) => {
        setLoading(true);
        const _cacheKey = cacheKey ? cacheKey + (params ? `--${params.map(String).join(",")}` : "") : undefined;
        if (!force && _cacheKey && ApiSlice.cache[_cacheKey]) {
          setData(ApiSlice.cache[_cacheKey] as T);
          setLoading(false);
          stopGlobalLoading();
          return;
        }
        const currentFetchId = ++fetchCount.current;

        const rsp = await fetcher();
        stopGlobalLoading();
        setLoading(false);

        // avoid overlapping requests
        if (currentFetchId !== fetchCount.current) return;

        if (!rsp.meta.error) {
          setData(rsp.data);
          if (_cacheKey) ApiSlice.cache[_cacheKey] = rsp.data;
          if (error) setUseApiError(null);
        } else {
          if (data) setData(null);
          setUseApiError({ code: rsp.meta.error.code, message: rsp.meta.error.message });
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [...(params || []), ...(cacheKey ? [cacheKey] : [])]
    );

    const reload = useCallback(async () => {
      setLoading(true);
      await getData(true);
    }, [getData]);

    useEffect(() => {
      getData();
    }, [getData]);

    return {
      data,
      loading,
      success: Boolean(!loading && !error),
      error,
      reload
    };
  }

  static error(): Promise<ResponseModel<null>> {
    return Promise.resolve({
      data: null,
      meta: {
        error: {
          code: 4000,
          message: "Unknown error"
        },
        status: 400
      }
    });
  }

  static loading(): Promise<ResponseModel<null>> {
    return new Promise(resolve => {
      setTimeout(
        () => {
          resolve({ data: null, meta: { error: null, status: 200 } });
        },
        1000 * 60 * 5
      );
    });
  }

  static token: string | null = null;

  static setToken(token: string | null) {
    this.token = token;
  }
}
