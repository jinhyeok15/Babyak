"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[600],
    },
  },
});

const queryClient = new QueryClient();

const Template = ({ children }: {
  children: React.ReactNode;
}) => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <main>
          {children}
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Template;
