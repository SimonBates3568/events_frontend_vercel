import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  Flex,
} from "@chakra-ui/react";

function SignupForm() {
  const [form, setForm] = useState({ name: "", username: "", password: "", image: "" });
  const toast = useToast();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("https://events-api-postgresql.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      toast({
        title: "Account created.",
        description: "Your account has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setForm({ name: "", username: "", password: "", image: "" });
    } else {
      toast({
        title: "Error",
        description: "There was a problem creating your account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        bg="white"
        p={{ base: 6, md: 8 }}
        rounded="lg"
        shadow="lg"
        w="full"
        maxW="md"
      >
        <Heading mb={6} size="lg" textAlign="center" color="teal.600">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "teal.400" }}
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "teal.400" }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "teal.400" }}
              />
            </FormControl>
            <FormControl id="image">
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "teal.400" }}
              />
            </FormControl>
            <Button
              colorScheme="teal"
              type="submit"
              w="full"
              size="lg"
              mt={2}
              _hover={{ bg: "teal.500" }}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default SignupForm;