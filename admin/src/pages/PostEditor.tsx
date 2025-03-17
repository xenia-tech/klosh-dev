import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Heading,
  HStack,
  Switch,
  FormHelperText,
  useColorModeValue,
} from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { supabase } from '../lib/supabase'
import DashboardLayout from '../components/DashboardLayout'
import { Post } from '../types'

export default function PostEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const isEditing = !!id
  const editorRef = useRef<any>(null)

  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<Partial<Post>>({
    title: '',
    content: '',
    published: false,
    image_url: '',
    slug: '',
  })

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const cardBgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    if (isEditing) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (data) setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch post',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      navigate('/dashboard')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const content = editorRef.current.getContent()
      const slug = post.slug || post.title?.toLowerCase().replace(/\s+/g, '-')
      const timestamp = new Date().toISOString()

      if (isEditing) {
        const { error } = await supabase
          .from('posts')
          .update({
            ...post,
            content,
            slug,
            updated_at: timestamp,
          })
          .eq('id', id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('posts').insert([
          {
            ...post,
            content,
            slug,
            created_at: timestamp,
            updated_at: timestamp,
          },
        ])

        if (error) throw error
      }

      toast({
        title: 'Success',
        description: `Post ${isEditing ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving post:', error)
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} post`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleTogglePublished = () => {
    setPost((prev) => ({ ...prev, published: !prev.published }))
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
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="center">
              {isEditing ? 'Edit Post' : 'New Post'}
            </Heading>

            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    size="lg"
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
                </FormControl>

                <FormControl>
                  <FormLabel>Slug</FormLabel>
                  <Input
                    name="slug"
                    value={post.slug}
                    onChange={handleChange}
                    placeholder="post-url-slug"
                    size="lg"
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
                  <FormHelperText>
                    Leave empty to generate from title
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Featured Image URL</FormLabel>
                  <Input
                    name="image_url"
                    value={post.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    size="lg"
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
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Content</FormLabel>
                  <Box borderWidth="1px" borderColor={borderColor} rounded="md">
                    <Editor
                      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                      onInit={(evt, editor) => editorRef.current = editor}
                      initialValue={post.content}
                      init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    />
                  </Box>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="published" mb="0">
                    Published
                  </FormLabel>
                  <Switch
                    id="published"
                    isChecked={post.published}
                    onChange={handleTogglePublished}
                  />
                </FormControl>

                <HStack spacing={4} width="100%" justify="center">
                  <Button
                    type="submit"
                    bg="#39FF14"
                    color="black"
                    size="lg"
                    isLoading={loading}
                    loadingText="Saving"
                    _hover={{
                      bg: '#32E512',
                    }}
                    minW="150px"
                  >
                    {isEditing ? 'Update Post' : 'Create Post'}
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    size="lg"
                    variant="outline"
                    minW="150px"
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </DashboardLayout>
  )
}
