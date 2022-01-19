import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const FooterLink = (href: string, label: string, index: number) => {
  return (
    <Typography
      key={`link-${index}`}
      variant="body2"
      sx={{
        margin: `5px 10px 5px 10px`,
        color: `primary.main`,
        whiteSpace: `nowrap`,
      }}
    >
      <Link href={href}>
        <a>{label}</a>
      </Link>
    </Typography>
  );
};

const links = [
  { href: `/`, label: `Contáctanos` },
  // { href: `/`, label: `Refiérenos` },
  // { href: `/`, label: `Trabaja con nosotros` },
  { href: `/`, label: `Equipo` },
  // { href: `/`, label: `Propuestas` },
  // { href: `/`, label: `Términos y condiciones` },
  // { href: `/`, label: `Estadísticas abiertas` },
];

const Footer = () => {
  return (
    <Box sx={{ height: `70px`, position: `relative`, bottom: `0px` }}>
      <Box sx={{ padding: `10px 60px 10px 60px` }}>
        <Box sx={{ width: `80px` }}></Box>
        <Box
          sx={{
            display: `flex`,
            flexDirection: {
              xs: `column`,
              sm: `row`,
              md: `row`,
            },
            justifyContent: `center`,
            alignItems: {
              xs: `center`,
            },
          }}
        >
          {links.map(({ href, label }, index) =>
            FooterLink(href, label, index),
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
