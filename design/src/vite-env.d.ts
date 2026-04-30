/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_HASH?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ADMIN_PIN?: string;
  readonly VITE_ADMIN_MAX_FAILED_ATTEMPTS?: string;
  readonly VITE_ADMIN_BAN_MINUTES?: string;
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
