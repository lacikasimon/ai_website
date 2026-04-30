/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_HASH?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ADMIN_PIN?: string;
  readonly VITE_ADMIN_MAX_FAILED_ATTEMPTS?: string;
  readonly VITE_ADMIN_BAN_MINUTES?: string;
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
  readonly VITE_CONTACT_LEAD_ENDPOINT?: string;
  readonly VITE_CONTACT_LEAD_CAMPAIGN?: string;
  readonly VITE_CMS_ENDPOINT?: string;
  readonly VITE_ADMIN_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
