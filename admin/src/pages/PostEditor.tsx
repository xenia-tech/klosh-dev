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
import { supabase } from '../lib/supabase'

// Define Post type
interface Post {
  id?: number;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export default function PostEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const [formData, setFormData] = useState<Post>({
    title: '',
    slug: '',
    content: '',
    image_url: '',
    published: false,
  })
  
  const [loading, setLoading] = useState(false)
  const isNewPost = !id

  useEffect(() => {
    if (!isNewPost) {
      fetchPost()
    }
  }, [id, isNewPost])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content || '',
          image_url: data.image_url || '',
          published: data.published,
        })
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch post',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

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
      const postData = {
        ...formData,
        updated_at: new Date().toISOString()
      }

      console.log('Submitting post data:', postData);

      if (isNewPost) {
        // Create new post
        const { error } = await supabase
          .from('posts')
          .insert([{ ...postData, created_at: new Date().toISOString() }])

        if (error) {
          console.error('Supabase error creating post:', error);
          throw error;
        }
        
        toast({
          title: 'Success',
          description: 'Post created successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } else {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', id)

        if (error) {
          console.error('Supabase error updating post:', error);
          throw error;
        }
        
        toast({
          title: 'Success',
          description: 'Post updated successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: `Failed to ${isNewPost ? 'create' : 'update'} post: ${error.message || 'Unknown error'}`,
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
                name="image_url"
                value={formData.image_url}
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
