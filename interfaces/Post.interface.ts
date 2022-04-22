import { User } from './User.interface'

export interface Post {
  title: string
  description: string
  category: string
  imageUrl: string
  favoriteAmount: number
  create_at: string
  user: User
}
