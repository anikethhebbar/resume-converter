import React from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={4} bg="gray.50">
      <Container maxW="md" bg="white" p={6} borderRadius="md" boxShadow="md">
        <Heading as="h1" mb={6}>LinkedIn PDF to HTML Resume Converter</Heading>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
