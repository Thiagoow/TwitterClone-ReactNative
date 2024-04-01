import { User } from '#model/user'
import { Post } from '#model/post'

export interface Retweet {
  id: number
  user: User
  post: Post
  createdAt: string
}
