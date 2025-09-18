import { AxiosHeaders } from "axios";

export const CSRF_COOKIE_NAME = "csrf_token";
export const CSRF_HEADER_NAME = "X-CSRF-Token";

export const readCsrfFromCookie = (): string | null => {
  const pattern = new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : null;
};

export const ensureCsrfHeader = (headers: AxiosHeaders): void => {
  if (!headers.has(CSRF_HEADER_NAME)) {
    const token = readCsrfFromCookie();
    if (token) {
      headers.set(CSRF_HEADER_NAME, token);
    }
  }
};
