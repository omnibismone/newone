import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = (container as any)._reactRootContainer || createRoot(container);
  (container as any)._reactRootContainer = root;
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
