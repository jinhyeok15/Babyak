import Container from '@mui/material/Container';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container maxWidth="lg">
      {children}
    </Container>
  );
}
