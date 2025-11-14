declare module 'virtual:pwa-register' {
  export function registerSW(options?: {
    immediate?: boolean;
    onRegistered?: (registration?: ServiceWorkerRegistration) => void;
    onRegisterError?: (error: unknown) => void;
  }): (reloadPage?: boolean) => void;
}
