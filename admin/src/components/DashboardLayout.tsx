import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Header */}
      <Box
        bg={headerBg}
        borderBottom="1px"
        borderColor={borderColor}
        position="fixed"
        w="100%"
        zIndex={10}
      >
        <Flex
          h="16"
          px={4}
          alignItems="center"
          justifyContent="space-between"
          maxW="1200px"
          mx="auto"
        >
          <Flex align="center">
            <Image
              src="/admin/img/logo/dark.png"
              alt="Logo"
              h="16"
              mr={3}
            />
          </Flex>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            >
              <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                {user?.email}
              </Text>
              <Text fontSize="sm" display={{ base: 'block', md: 'none' }}>
                Account
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box pt="16">
        {children}
      </Box>
    </Box>
  )
}
