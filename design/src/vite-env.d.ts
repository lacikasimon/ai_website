/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_HASH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
