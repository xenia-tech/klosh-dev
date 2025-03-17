import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Flex,
  Heading,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  TableContainer,
  useColorModeValue,
  Image,
  VStack,
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { format } from 'date-fns'
import { supabase } from '../lib/supabase'
import { Post } from '../types'
import DashboardLayout from '../components/DashboardLayout'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const navigate = useNavigate()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch posts',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
      setPosts(posts.filter(post => post.id !== id))
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const togglePublished = async (post: Post) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published: !post.published })
        .eq('id', post.id)

      if (error) throw error

      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !p.published } : p
      ))

      toast({
        title: 'Success',
        description: `Post ${post.published ? 'unpublished' : 'published'} successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error toggling post status:', error)
      toast({
        title: 'Error',
        description: 'Failed to update post status',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <DashboardLayout>
      <Box
        minH="calc(100vh - 64px)"
        w="100vw"
        bg={bgColor}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        pt="24"
      >
        <Box
          w={{ base: "95%", md: "90%", lg: "1200px" }}
          mx="auto"
          bg={cardBgColor}
          boxShadow="lg"
          rounded="lg"
          p={{ base: 4, md: 8 }}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'stretch', md: 'center' }}
            mb={6}
            gap={4}
          >
            <Heading size="lg">Blog Posts</Heading>
            <Button
              leftIcon={<AddIcon />}
              bg="#39FF14"
              color="black"
              _hover={{
                bg: '#32E512',
              }}
              onClick={() => navigate('/new-post')}
              w={{ base: '100%', md: 'auto' }}
            >
              New Post
            </Button>
          </Flex>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th width="40%">Title</Th>
                  <Th width="15%">Status</Th>
                  <Th width="15%" display={{ base: 'none', md: 'table-cell' }}>Created</Th>
                  <Th width="15%" display={{ base: 'none', md: 'table-cell' }}>Updated</Th>
                  <Th width="15%">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posts.map((post) => (
                  <Tr key={post.id}>
                    <Td width="40%">{post.title}</Td>
                    <Td width="15%">
                      <Badge
                        colorScheme={post.published ? 'green' : 'gray'}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </Td>
                    <Td width="15%" display={{ base: 'none', md: 'table-cell' }}>
                      {format(new Date(post.created_at), 'MMM d, yyyy')}
                    </Td>
                    <Td width="15%" display={{ base: 'none', md: 'table-cell' }}>
                      {format(new Date(post.updated_at), 'MMM d, yyyy')}
                    </Td>
                    <Td width="15%">
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          size="sm"
                          w={{ base: '100%', md: 'auto' }}
                        >
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            icon={<EditIcon />}
                            onClick={() => navigate(`/edit-post/${post.id}`)}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => togglePublished(post)}
                          >
                            {post.published ? 'Unpublish' : 'Publish'}
                          </MenuItem>
                          <MenuItem
                            icon={<DeleteIcon />}
                            onClick={() => handleDelete(post.id)}
                            color="red.500"
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </DashboardLayout>
  )
}
