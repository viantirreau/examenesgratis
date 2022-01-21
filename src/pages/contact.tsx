import Layout from '@/containers/Layout';
import { Container, List, ListItem, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Contact = () => {
  return (
    <Layout>
      <Container>
        <h1>Contáctanos</h1>
        <List>
          <ListItem>
            <Stack>
              <h3>Dominique Tirreau</h3>

              <Container sx={{ paddingLeft: `1em` }}>
                <Link href="mailto:dominiquetirreau@ug.uchile.cl">
                  dominiquetirreau@ug.uchile.cl
                </Link>
              </Container>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack>
              <h3>María José Valdivia</h3>
              <Container sx={{ paddingLeft: `1em` }}>
                <Link href="mailto:maria.valdivia.r@ug.uchile.cl">
                  maria.valdivia.r@ug.uchile.cl
                </Link>
                {` `}
              </Container>
            </Stack>
          </ListItem>
        </List>
      </Container>
    </Layout>
  );
};

export default Contact;
