interface ImportMetaEnv {
  readonly ASTRO_EMAIL_HOST: string;
  readonly ASTRO_EMAIL_PORT: number;
  readonly ASTRO_EMAIL_SECURE: boolean;
  readonly ASTRO_EMAIL_USER: string;
  readonly ASTRO_EMAIL_PASS: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }