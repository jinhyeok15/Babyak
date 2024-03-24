"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import { Container } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const theme = createTheme({
  palette: {
    // primary: {
    //   main: yellow[600],
    // },
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
          <Container maxWidth="md">
            {children}
          </Container>
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Template;
