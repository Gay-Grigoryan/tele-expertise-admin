import type { ResponseType } from "axios";
import { Language } from "./enums";

export type RequestOptions = {
  auth?: boolean;
  headers?: Record<string, unknown>;
  responseType?: ResponseType;
};

export type ResponseModel<T = unknown> = {
  meta: {
    error: null | {
      code: number;
      message: string;
      unique_key?: string;
      info?: unknown;
    };
    status: number;
  };
  data: T;
};

export type Translation = Record<Language, string>;
