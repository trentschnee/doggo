/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FETCH_FETAKEHOME_BASE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}