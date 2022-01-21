import * as React from 'react';
import Box from '@mui/material/Box';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import theme from '@/styles/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

interface Props {
  children: React.ReactChild | null;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>ExámenesVIH</title>
        <meta
          property="og:description"
          content="Busca lugares cercanos para realizarte un test de VIH gratis"
        />
        <meta property="og:site_name" content="Exámenes Gratis" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: `grid`,
            minHeight: `100vh`,
            gridTemplateRows: `auto 1fr auto`,
          }}
        >
          <NavBar />
          <Box
            sx={{
              width: `100%`,
              minHeight: `75vh`,
              maxWidth: `1000px`,
              margin: `60px auto 40px auto`,
              flex: `1 0 auto`,
              padding: `10px`,
            }}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
