import { User } from '#model/user'
import { Post } from '#model/post'

export interface Like {
  id: number
  user: User
  post: Post
}
