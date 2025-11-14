import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from 'virtual:pwa-register';

// Explicitly register the PWA Service Worker so notifications work in dev and prod
registerSW({
  immediate: true,
  onRegistered(r) {
    console.log('SW registered', r);
  },
  onRegisterError(e) {
    console.log('SW registration error', e);
  }
});

createRoot(document.getElementById("root")!).render(<App />);

