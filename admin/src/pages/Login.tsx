import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Container,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Image,
  Flex,
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const { signIn } = useAuth()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await signIn(email, password)
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in. Please check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      w="100vw"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w={{ base: "90%", sm: "80%", md: "400px" }}
        mx="auto"
        bg={cardBgColor}
        boxShadow="lg"
        rounded="lg"
        p={{ base: 6, md: 8 }}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack spacing={6} align="center" w="100%">
          <Image
            src="/img/logo/dark.png"
            alt="Logo"
            boxSize={{ base: '100px', md: '120px' }}
          />
          
          <VStack spacing={2} w="100%" textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }}>
              Welcome Back
            </Heading>
            <Text color="gray.500" fontSize={{ base: 'sm', md: 'md' }}>
              Sign in to access your dashboard
            </Text>
          </VStack>

          <VStack
            as="form"
            onSubmit={handleSubmit}
            spacing={4}
            w="100%"
          >
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.500" />
                </InputLeftElement>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  size={{ base: 'md', md: 'lg' }}
                  bg={useColorModeValue('white', 'gray.700')}
                  borderColor={borderColor}
                  _hover={{
                    borderColor: useColorModeValue('gray.300', 'gray.600'),
                  }}
                  _focus={{
                    borderColor: '#39FF14',
                    boxShadow: '0 0 0 1px #39FF14',
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.500" />
                </InputLeftElement>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size={{ base: 'md', md: 'lg' }}
                  bg={useColorModeValue('white', 'gray.700')}
                  borderColor={borderColor}
                  _hover={{
                    borderColor: useColorModeValue('gray.300', 'gray.600'),
                  }}
                  _focus={{
                    borderColor: '#39FF14',
                    boxShadow: '0 0 0 1px #39FF14',
                  }}
                />
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              w="100%"
              size={{ base: 'md', md: 'lg' }}
              isLoading={loading}
              loadingText="Signing in..."
              bg="#39FF14"
              color="black"
              _hover={{
                bg: '#32E512',
              }}
              _active={{
                bg: '#2BCC0F',
              }}
              mt={2}
            >
              Sign In
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  )
}
