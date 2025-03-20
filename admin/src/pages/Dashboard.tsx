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
  TableContainer,
  useColorModeValue,
  Text,
  Center,
} from '@chakra-ui/react'
import { AddIcon, EditIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

// Define Post type
interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at?: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch posts',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [toast]);

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (post: Post) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) {
        throw error;
      }

      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: !post.published } : p
      ));
      
      toast({
        title: 'Success',
        description: `Post ${post.published ? 'unpublished' : 'published'} successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to update post',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={bgColor} pt="6" px="4">
      {/* Header */}
      <Box 
        bg={cardBgColor} 
        p={4} 
        mb={6} 
        borderBottom="1px" 
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center">
          <Heading size="md">Klosh Admin</Heading>
          <Text>Dashboard</Text>
        </Flex>
      </Box>

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
            colorScheme="green"
            onClick={() => navigate('/new-post')}
          >
            New Post
          </Button>
        </Flex>

        {loading ? (
          <Center p={8}>
            <Text>Loading...</Text>
          </Center>
        ) : posts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Heading size="md" mb={4}>No posts found</Heading>
            <Text mb={6}>Create your first blog post to get started.</Text>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="green"
              onClick={() => navigate('/new-post')}
            >
              Create Post
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posts.map((post) => (
                  <Tr key={post.id}>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{post.title}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {post.slug}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={post.published ? 'green' : 'yellow'}
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </Td>
                    <Td>
                      {format(new Date(post.created_at), 'MMM d, yyyy')}
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <IconButton
                          aria-label="Edit post"
                          icon={<EditIcon />}
                          size="sm"
                          onClick={() => navigate(`/edit-post/${post.id}`)}
                        />
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="More options"
                            icon={<ChevronDownIcon />}
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem onClick={() => togglePublished(post)}>
                              {post.published ? 'Unpublish' : 'Publish'}
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(post.id)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
