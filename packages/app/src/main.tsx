import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/components/App';
import AppProviders from './app/contexts/AppProviders';
import { ThemeProvider } from '@mui/material';
import theme from './app/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppProviders>
        <App />
      </AppProviders>
    </ThemeProvider>
  </StrictMode>
);
