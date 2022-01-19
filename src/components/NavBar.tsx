import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const redirect = (path: string) => {
    router.push(path);
  };
  return (
    <Box
      sx={{
        position: `fixed`, // Esta línea y las tres siguientes se borran para evitar fixed navbar
        backgroundColor: `white`,
        top: 0,
        zIndex: `1000`,
        display: `inline-flex`,
        justifyContent: `space-between`,
        width: `100%`,
        padding: `5px 20px 5px 20px`,
        alignItems: `center`,
        borderBottom: `1px solid #eee`,
      }}
    >
      <Box
        sx={{ cursor: `pointer`, alignSelf: `center` }}
        onClick={() => redirect(`/`)}
      >
        <Typography variant="h4" fontFamily="Nunito Sans">
          ExámenesVIH
        </Typography>
      </Box>
      <Box sx={{ display: `inlineFlex` }}>
        <Button
          disableRipple
          sx={{
            margin: `0 2.5pt 0 2.5pt`,
            padding: `0 5pt 0 5pt`,
            borderRadius: `350px`,
            fontFamily: `Nunito Sans`,
          }}
          size="large"
          onClick={() => redirect(`/wtf`)}
        >
          <Typography
            variant="body1"
            component="div"
            sx={{
              fontWeight: `700`,
              color: `primary.main`,
              fontSize: `18px`,
            }}
          >
            Cómo funciona
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
