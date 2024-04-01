import { User } from '#model/user'
import { File } from '#model/file'
import { Comment } from '#model/comment'
import { Like } from '#model/like'
import { Retweet } from '#model/retweet'

export interface Post {
  id: number
  content: string
  user: User
  media?: File[]
  comments?: Comment[]
  likes?: Like[]
  retweets?: Retweet[]
  likesCount: number
  commentsCount: number
  retweetsCount: number
  createdAt: string
  updatedAt: string
}
