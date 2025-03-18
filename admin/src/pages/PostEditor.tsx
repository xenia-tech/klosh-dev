import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  useToast,
  Heading,
  Switch,
  FormHelperText,
  useColorModeValue,
  Text,
  Flex,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

// Mock post data
const mockPosts = [
  {
    id: 1,
    title: 'Sample Blog Post 1',
    slug: 'sample-blog-post-1',
    excerpt: 'This is a sample blog post for development purposes.',
    content: '<p>This is the content of the first sample blog post.</p>',
    featured_image: 'https://via.placeholder.com/800x400',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Sample Blog Post 2',
    slug: 'sample-blog-post-2',
    excerpt: 'Another sample blog post for testing the dashboard.',
    content: '<p>This is the content of the second sample blog post.</p>',
    featured_image: 'https://via.placeholder.com/800x400',
    published: false,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function PostEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    published: false,
  })
  
  const [loading, setLoading] = useState(false)
  const isNewPost = !id

  useEffect(() => {
    if (!isNewPost) {
      // Find post in mock data
      const post = mockPosts.find(p => p.id === Number(id))
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image: post.featured_image,
          published: post.published,
        })
      }
    }
  }, [id, isNewPost])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, published: e.target.checked }))
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
    
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate saving
      setTimeout(() => {
        toast({
          title: 'Success',
          description: `Post ${isNewPost ? 'created' : 'updated'} successfully`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isNewPost ? 'create' : 'update'} post`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

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
          <Text>{isNewPost ? 'New Post' : 'Edit Post'}</Text>
        </Flex>
      </Box>

      <Box
        w={{ base: "95%", md: "90%", lg: "800px" }}
        mx="auto"
        bg={cardBgColor}
        boxShadow="lg"
        rounded="lg"
        p={{ base: 4, md: 8 }}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <HStack mb={6} spacing={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Heading size="lg">{isNewPost ? 'Create New Post' : 'Edit Post'}</Heading>
        </HStack>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Post title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Slug</FormLabel>
              <HStack>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="post-url-slug"
                />
                <Button onClick={generateSlug} size="sm">
                  Generate from Title
                </Button>
              </HStack>
              <FormHelperText>
                The URL-friendly version of the title
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Excerpt</FormLabel>
              <Textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief summary of the post"
                rows={3}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Content</FormLabel>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Post content (HTML supported)"
                rows={10}
              />
              <FormHelperText>
                HTML formatting is supported
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Featured Image URL</FormLabel>
              <Input
                name="featured_image"
                value={formData.featured_image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="published" mb="0">
                Published
              </FormLabel>
              <Switch
                id="published"
                isChecked={formData.published}
                onChange={handleSwitchChange}
              />
            </FormControl>

            <HStack spacing={4} pt={4}>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={loading}
                loadingText="Saving"
              >
                {isNewPost ? 'Create Post' : 'Update Post'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}
