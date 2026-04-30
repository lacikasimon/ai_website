/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_HASH?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ADMIN_PIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
