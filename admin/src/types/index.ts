export interface Post {
  id: number
  title: string
  content: string
  image_url?: string
  created_at: string
  updated_at: string
  published: boolean
  slug: string
}

export interface User {
  id: string
  email: string
}
