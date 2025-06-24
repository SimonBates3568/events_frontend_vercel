import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link } from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <Box as="nav" bg="teal.600" px={6} py={4} boxShadow="md">
      <Flex align="center" justify="space-between">
        <Box>
          <Box as="h1" color="white" fontWeight="bold" fontSize={["lg", "xl", "2xl"]} letterSpacing="wide">
            Event Management App
          </Box>
        </Box>
        <Flex as="ul" listStyleType="none" gap={6}>
          <Box as="li">
            <Link
              as={RouterLink}
              to="/"
              color="white"
              fontSize={["md", "lg"]}
              fontWeight="medium"
              _hover={{ textDecoration: "underline", color: "teal.200" }}
              transition="color 0.2s"
            >
              Events
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
