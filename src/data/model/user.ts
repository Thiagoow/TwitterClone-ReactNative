import { Post } from '#model/post'
import { File } from '#model/file'

export interface User {
  id: number
  token?: string
  username: string
  fullName: string
  email: string
  posts?: Post[]
  avatar: File | null
  followers?: User[]
  following?: User[]
  postsCount?: number
  followersCount?: number
  followingCount?: number
  retweetsCount?: number
  isFollowing?: boolean
  createdAt: string
  updatedAt: string
}
