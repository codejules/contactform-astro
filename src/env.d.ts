interface ImportMetaEnv {
  readonly EMAIL_HOST: string;
  readonly EMAIL_PORT: number;
  readonly EMAIL_SECURE: boolean;
  readonly EMAIL_USER: string;
  readonly EMAIL_PASS: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }