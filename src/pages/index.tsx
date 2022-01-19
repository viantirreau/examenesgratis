import styles from '@/styles/Home.module.css';
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Container } from '@mui/material';
import GoogleMap from '@/components/GoogleMap';
import { NextPage } from 'next';
import Layout from '@/containers/Layout';
import { Box } from '@mui/system';

const Home: NextPage = () => {
  return (
    <Layout>
      <Box>
        <GoogleMap />
      </Box>
    </Layout>
  );
};
export default Home;
