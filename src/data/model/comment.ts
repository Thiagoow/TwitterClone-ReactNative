import { User } from '#model/user'
import { Post } from '#model/post'

export interface Comment {
  id: number
  content: string
  user: User
  post?: Post
  createdAt: string
  updatedAt: string
}
