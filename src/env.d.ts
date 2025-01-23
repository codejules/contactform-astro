interface ImportMetaEnv {
  readonly VITE_EMAIL_HOST: string;
  readonly VITE_EMAIL_USER: string;
  readonly VITE_EMAIL_PASS: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }