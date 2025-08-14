declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (params: { client_id: string; callback: Function }) => void;
          renderButton: (element: HTMLElement, options: { theme: string; size: string }) => void;
        };
      };
    };
  }
}